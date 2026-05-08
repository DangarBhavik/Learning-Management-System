import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

const CustomPagination = ({
  paginationData,
  getPreviousPage,
  getNextPage,
}: {
  paginationData: {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  getPreviousPage: () => void;
  getNextPage: () => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {paginationData?.hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious onClick={getPreviousPage} />
          </PaginationItem>
        )}

        <PaginationItem>
          <span className="text-xs">
            Page {paginationData?.currentPage} of {paginationData?.totalPages}
          </span>
        </PaginationItem>

        {paginationData?.hasNextPage && (
          <PaginationItem>
            <PaginationNext onClick={getNextPage} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
