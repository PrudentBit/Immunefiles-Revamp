export default async function createFolder(name: String, currentFolder: string) {
    function parentID() {
      if (currentFolder === "root") {
        return "";
      } else {
        return `${currentFolder}`;
      }
    }
  
    const createFolderData = {
      name: name,
      parent: parentID(),
      shared_with: [],
    };
  
    const upload = await fetch(
      `${process.env.REACT_APP_BASE_URL}/content/folder_create?tenant=${
        window.location.hostname.split(".")[0]
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}`,
        },
        body: JSON.stringify(createFolderData),
      }
    );
  
    const response = await upload.json();
    if (upload.status === 200) {
      return { success: true, message: "Folder Created" };
    } else {
      throw new Error("Some error occurred, try again later!");
    }
  }
  