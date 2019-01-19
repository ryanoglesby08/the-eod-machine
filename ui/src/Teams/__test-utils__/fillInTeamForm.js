import { fireEvent, within } from 'react-testing-library'

import { enterText, chooseReactSelect } from '../../__test-utils__/inputEvents'

const fillInTeamForm = ({ getByLabelText, getByTestId, getByText }) => data => {
  enterText(getByLabelText('Name'), data['Name'])
  enterText(getByLabelText('Mailing list'), data['Mailing list'])

  data.locations.forEach((location, index) => {
    const locationContainer = within(getByTestId(`location-${index}`))

    enterText(locationContainer.getByLabelText('Name'), location['Name'])

    chooseReactSelect(
      locationContainer.getByLabelText('Time zone'),
      location['Time zone']
    )
    chooseReactSelect(
      locationContainer.getByLabelText('EOD time'),
      location['EOD time']
    )
  })

  fireEvent.click(getByText('Save'))
}

export default fillInTeamForm
