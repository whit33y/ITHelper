export interface ReportRecords {
  total: number;
  documents: Array<ReportDocuments>;
}

export interface ReportDocuments {
  user_id: string;
  status?: string;
  category: string;
  title: string;
  descripiton: string;
  assigned_to?: string;
  priority: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
