
export class PagedResultDTO {
  
    
      constructor(dataset:object,recordsPerPage:number,currentPage:number,recordCount:number) 
      {
        this.data = dataset;
        this.recordCount = recordCount;
        this.currentPage = currentPage <= 0 ? 1 : currentPage;
        this.pageSize = recordsPerPage;
        this.pageCount =Math.ceil(recordCount / recordsPerPage);
        this.hasNextPage = this.currentPage < this.pageCount;
        this.hasPreviousPage = this.currentPage > 1;

      }

        hasNextPage: boolean
        hasPreviousPage:boolean
        currentPage?:number
        pageCount:number
        pageSize?:number
        recordCount:number
        data:object
        searchTerm?: string
}