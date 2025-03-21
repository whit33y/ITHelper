export interface CommentRecords {
  total: number;
  documents: Array<CommentDocuments>;
}

export interface CommentDocuments {
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
