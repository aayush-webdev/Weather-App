

const NoResultsDiv = () => {
  return (
    <div className="no-results">
        <img src="/icons/no-result.svg" alt="No Results Found" className="icon" />
        <h3 className="title">Something Went Wrong</h3>
        <p className="message"> We couldn't find any results for your search. Ensure you entered a valid city name. Or Try Again Later.</p>
      
    </div>
  )
}

export default NoResultsDiv
