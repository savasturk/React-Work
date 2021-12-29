import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import makeData from './makeData'
import EnhancedTable from './EnhancedTable';

const ReactTable = (props) => {

	const columns = React.useMemo(
		() => [
		  {
			Header: 'Id',
			accessor: 'id',
		  },
		  {
			Header: 'Kontrat',
			accessor: 'kontrat',
		  },
		  {
			Header: 'Teklif',
			accessor: 'teklif',
		  },
		  {
			Header: 'Data',
			accessor: 'data',
		  },
		],
		[]
	  )

	  const [data, setData] = React.useState(React.useMemo(() => makeData(5), []))
  	  const [skipPageReset, setSkipPageReset] = React.useState(false)

		const updateMyData = (rowIndex, columnId, value) => {
			// We also turn on the flag to not reset the page
			setSkipPageReset(true)
			setData(old =>
			  old.map((row, index) => {
				if (index === rowIndex) {
				  return {
					...old[rowIndex],
					[columnId]: value,
				  }
				}
				return row
			  })
			)
		  }

	return(
		<div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
	);
}

export default ReactTable;