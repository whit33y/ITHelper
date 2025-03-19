export interface CommentsRecords {
  total: number;
  documents: Array<CommentsDocuments>;
}

export interface CommentsDocuments {
  user_id: string;
  report_id: string;
  text: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
