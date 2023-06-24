const PageButton = ({ pg, setPage }) => {
  return <button className="bg-blue-700 col-span-3 h-14 w-12 rounded-md shadow-lg" onClick={() => setPage(pg)}>{pg}</button>
}

export default PageButton