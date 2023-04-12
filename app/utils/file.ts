export function getFileBlob(url: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener("load", () => {
        resolve(xhr.response);
      });
      xhr.send();
    } catch (error) {
      reject(error);
    }
  });
}
