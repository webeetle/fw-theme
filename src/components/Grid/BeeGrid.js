import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import classNames from 'classnames'
import {
  DataTypeProvider,
  SearchState,
  SelectionState,
  SortingState,
  IntegratedFiltering,
  IntegratedSelection,
  IntegratedSorting, PagingState, IntegratedPaging, CustomPaging
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableSelection,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui'

class BeeGrid extends React.Component {
  render () {
    const {
      classes,
      className,
      rows = [],
      columns = [],
      toolbar,
      loading,
      search,
      selection,
      sorting,
      paging,
      table,
      tableHeaderRow,
      providers = [],
      ...rest
    } = this.props

    const GridClasses = classNames({
      'BeeGrid-root': true,
      [className]: className
    })

    return (
      <React.Fragment>
        {loading && <LinearProgress/>}
        <Grid
          rows={rows}
          columns={columns}
          className={GridClasses}
          {...rest}
        >

          {providers.length > 0
            ? providers.map((provider) => (
              <DataTypeProvider
                key={provider.for}
                {...provider}
              />
            )
            ) : null
          }

          <SelectionState {...selection} />
          <SearchState {...search} />
          <SortingState {...sorting} />
          <PagingState {...paging} />

          {search && !search.onValueChange ? <IntegratedFiltering/> : null}
          {selection && selection.showSelectAll ? <IntegratedSelection/> : null}
          {sorting && !sorting.onSortingChange ? <IntegratedSorting/> : null}
          {paging && !paging.onCurrentPageChange ? <IntegratedPaging/> : <CustomPaging {...paging} />}

          <Table
            {...table}
          />
          <TableHeaderRow
            showSortingControls={sorting && sorting.showSortingControls}
            {...tableHeaderRow}
          />

          {(search || toolbar) && <Toolbar/>}
          {search && <SearchPanel/>}
          {selection && <TableSelection {...selection} />}
          {paging && <PagingPanel {...paging} />}

        </Grid>
      </React.Fragment>
    )
  }
}

BeeGrid.propTypes = {
  classes: PropTypes.object,
  rows: PropTypes.array,
  columns: PropTypes.array,
  providers: PropTypes.array,
  loading: PropTypes.bool,
  search: PropTypes.object,
  toolbar: PropTypes.any,
  selection: PropTypes.object,
  table: PropTypes.object,
  tableHeaderRow: PropTypes.object,
  sorting: PropTypes.object,
  paging: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string
}

export default BeeGrid