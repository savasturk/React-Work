import React,{ useEffect, useState} from "react";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  useFilters,
  useSortByuseFilters,
  useGlobalFilter,
  useAsyncDebounce
} from "react-table";
import {matchSorter} from "match-sorter";
import cars from "../LeftBottom/mock-data.json";

import {dataValues} from "../LeftBottom/LeftBottom.js"
import returnDataValues from "../LeftBottom/LeftBottom.js"
import {todos} from "../LeftBottom/LeftBottom.js"

import { useDispatch} from 'react-redux'


import store from '../LeftBottom/store'
//store.subscribe(returnDataValues);


console.log("helloo")
//console.log(cart);

const Styles = styled.div`
  padding: 0rem;
  table {
    width: 100%;
    border-spacing: 0;
    border: 0px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.1rem 0.5rem;
      border-bottom: 0.05px solid black;
      border-right: 0.05px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Label = styled.label`
  padding: 5px;
  margin: 0 0 0px;
  display: block;

  :hover {
    background: #eee;
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 0px;
`;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
     
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;
 
  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
function test(){
  return store.getState();
}

// This is a custom filter UI for selecting
// a unique option from a list
function CheckBoxColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  console.log("buralarrr");
  console.log(store.getState());
  const options = React.useMemo(() => {
    let counts = {};
    preFilteredRows.forEach(x => {
      x = x.values[id];
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }, [id, preFilteredRows]);

  const [checked, setChecked] = React.useState();

  const onChange = e => {
    const t = e.target.name;
    setFilter(old => (t === old ? undefined : t));
    checked === t ? setChecked() : setChecked(t);
  };

  return (
    <React.Fragment>
      <Grid>
        {Object.entries(options).map(([option, count], i) => (
          <Label key={i} htmlFor={option}>
            <input
              type="checkbox"
              name={option}
              id={option}
              checked={checked === option ? true : false}
              onChange={onChange}
            />
            {option} ({count})
          </Label>
        ))}
      </Grid>
    </React.Fragment>
  );
}
export function refreshPage() {

  window.location.reload(true);
}

function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
	  const defaultRef = React.useRef()
	  const resolvedRef = ref || defaultRef
  
	  React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate
	  }, [resolvedRef, indeterminate])
  
	  return <input type="checkbox" ref={resolvedRef} {...rest} />
	}
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
	allColumns,
    getToggleHideAllColumnsProps,

    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  );

  // Render the UI for your table
  return (
    
    <React.Fragment>
      {headerGroups.map(headerGroup => (
        <div {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <div key={column.render("Header")}>
              {column.canFilter ? column.render("Header") : null}
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </div>
          ))}
        </div>
      ))}

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

<div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
     
      

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}

                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div> */}
    </React.Fragment>
  );
}

const ColumnFilter = (props) => {

  
 /*const birds = useSelector(state => state.birds);

  console.log(birds);*/

	const columns = React.useMemo(
		() => [
		  {
			Header: "Id",
			accessor: "Id",
			disableFilters: true
		  },
		  {
			Header: "Kontrat",
			accessor: "Kontrat",
			Filter: CheckBoxColumnFilter,
			filter: "includes"
		  },
		  {
			Header: "Teklif",
			accessor: "Teklif",
			disableFilters: true
		  },
		  {
			Header: "Data",
			accessor: "Data",
			disableFilters: true
		  }
		],
		[]
	  );
    const dispatch = useDispatch()

  console.log("eskisi");
  console.log(dataValues);
  console.log("yenisiiii");
 // var obj = dataValues;
 // console.log(store.getState())
  let obj = store.getState().counter.val;
  const arr = [];
  if(obj != null && obj != undefined){
    Object.keys(obj).forEach(key => arr.push({name: key, value: obj[key]}));

  }else{
    obj = arr;
  }

  console.log(arr);
  //console.log(dispatch(store.getState()));


/*useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);*/
 
	  const data = React.useMemo(() => obj, []);
	return(

		<div >
        <Styles>
        <Table columns={columns} data={data} />
      </Styles>
		</div>
	);
}

export default React.memo(ColumnFilter);