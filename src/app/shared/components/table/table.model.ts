export type TableColumn = {
  name: string;
  label: string;
};

export type TableColumns = TableColumn[];

export type TableRowItem = {
  label: string;
  route?: string;
};

export type TableRows = { [key: string]: TableRowItem }[];
