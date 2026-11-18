'use client'
import clsx from 'clsx'
import { Col, Row } from 'react-bootstrap'
import Icon from '../wrappers/Icon'

export type TablePaginationProps = {
  totalItems: number
  start: number
  end: number
  itemsName?: string
  showInfo?: boolean
  // Pagination control props
  previousPage: () => void
  canPreviousPage: boolean
  pageCount: number
  pageIndex: number
  setPageIndex: (index: number) => void
  nextPage: () => void
  canNextPage: boolean
}

const TablePagination = ({ totalItems, start, end, itemsName = 'items', showInfo, previousPage, canPreviousPage, pageCount, pageIndex, setPageIndex, nextPage, canNextPage }: TablePaginationProps) => {
  const pageWindowSize = 5
  const firstVisiblePage = Math.max(0, Math.min(pageIndex - Math.floor(pageWindowSize / 2), pageCount - pageWindowSize))
  const visiblePages = Array.from({ length: Math.min(pageCount, pageWindowSize) }, (_, index) => firstVisiblePage + index)

  return (
    <Row className={clsx('align-items-center text-center text-sm-start', showInfo ? 'justify-content-between' : 'justify-content-end')}>
      {showInfo && (
        <Col sm>
          <div className="text-muted">
            Showing <span className="fw-semibold">{start}</span> to <span className="fw-semibold">{end}</span> of <span className="fw-semibold">{totalItems}</span> {itemsName}
          </div>
        </Col>
      )}
      <Col sm="auto" className="mt-3 mt-sm-0">
        <div>
          <ul className="pagination pagination-sm pagination-boxed mb-0 justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span>
                  <Icon icon="chevron-left" />
                </span>
              </button>
            </li>

            {firstVisiblePage > 0 && (
              <>
                <li className="page-item">
                  <button className="page-link" onClick={() => setPageIndex(0)} aria-label="Go to first page">
                    1
                  </button>
                </li>
                {firstVisiblePage > 1 && (
                  <li className="page-item disabled">
                    <span className="page-link">…</span>
                  </li>
                )}
              </>
            )}
            {visiblePages.map((index) => (
              <li key={index} className={`page-item ${pageIndex === index ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPageIndex(index)}>
                  {index + 1}
                </button>
              </li>
            ))}
            {firstVisiblePage + visiblePages.length < pageCount && (
              <>
                {firstVisiblePage + visiblePages.length < pageCount - 1 && (
                  <li className="page-item disabled">
                    <span className="page-link">…</span>
                  </li>
                )}
                <li className="page-item">
                  <button className="page-link" onClick={() => setPageIndex(pageCount - 1)} aria-label="Go to last page">
                    {pageCount}
                  </button>
                </li>
              </>
            )}

            <li className="page-item">
              <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
                <Icon icon="chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  )
}

export default TablePagination
