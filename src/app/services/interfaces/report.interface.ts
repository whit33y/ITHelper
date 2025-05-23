export interface ReportRecords {
  total: number;
  documents: Array<ReportDocuments>;
}

export interface ReportDocuments {
  user_id: string;
  status?: string;
  category: string;
  title: string;
  description: string;
  assigned_to?: string;
  priority: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface StorageRecords {
  total: number;
  documents: Array<StorageDocuments>;
}

export interface StorageDocuments {
  reportId: string;
  fileId: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface AvatarRecords {
  total: number;
  documents: Array<AvatarDocuments>;
}

export interface AvatarDocuments {
  userId: string;
  fileId: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
