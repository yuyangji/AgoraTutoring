// hooks/useDocumentUploader.ts
import { useState } from "react";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import storage from "@react-native-firebase/storage";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FileDb } from "../Types/File";

const useDocumentUploader = () => {
  const [pickResults, setPickResults] = useState<DocumentPickerResponse[] | null>(null);

  const onPickDocuments = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      setPickResults(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Document picker was cancelled");
      } else {
        console.error("Document picker error: ", err);
      }
    }
  };

  const handleUpload = async (
    getStoragePath: (result: DocumentPickerResponse) => string,
 
  ) => {
    try {
      if (!pickResults) return;
      const storageRef = storage().ref();

      const uploadPromises = pickResults.map(async (result) => {
        const fileRef = storageRef.child(getStoragePath(result));
        await fileRef.putFile(result.uri);
        const url = await fileRef.getDownloadURL();
        return { name: result.name, url, type: result.type } as FileDb;  // Return an object with name and url
      });

      const files = await Promise.all(uploadPromises);
      return files;
    } catch (err) {
      alert("Upload failed");
      console.error("File upload error: ", err);
    }
  };

  return {
    pickResults,
    onPickDocuments,
    handleUpload,
  };
};

export default useDocumentUploader;
