export const toGraphQlSchema = teamData => {
  const mailingListAsArray = teamData.mailingList
    .split(',')
    .map(emailAddress => emailAddress.trim())

  return {
    ...teamData,
    mailingList: mailingListAsArray,
  }
}
