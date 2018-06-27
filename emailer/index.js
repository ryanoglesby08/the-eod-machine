const fetch = require('node-fetch');

const nodemailer = require('nodemailer');

const ApolloClient = require("apollo-client").default;
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require('graphql-tag');

const allConfigs = require('./config');

const config = allConfigs[process.env.APP_ENV || 'dev'];

const apiClient= new ApolloClient({
    link: new HttpLink({ uri: `${config.apiUrl}/api/graphql`, fetch }),
    cache: new InMemoryCache()
});

const SAY_HELLO = gql`
    {
        hello {
            message
        }
    }
`;

const execute = async () => {
    const { data } = await apiClient.query({query: SAY_HELLO});

    const message = data.hello.message;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount(async (err, account) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: '"The EOD Machine" <eodmachine@theeodmachine.com>', // sender address
            to: 'foobar@example.com', // list of receivers
            subject: 'Hello from the EOD Machine', // Subject line
            text: message, // plain text body
            html: `<b>${message}</b>` // html body
        };

        // send mail with defined transport object
        try {
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        catch(error) {
            console.log(error);
        }
    });
};

execute();