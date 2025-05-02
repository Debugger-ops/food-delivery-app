'use client';
import { useState } from 'react';
import Image from "next/image";
import toast from "react-hot-toast";
import './editable.css';

export default function EditableImage({ link, setLink }) {
  // Manual URL state to keep track of the text input value.
  const [manualUrl, setManualUrl] = useState(link || '');

  // File input handler for uploading a file.
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      // Promise for uploading the file.
      const uploadPromise = (async () => {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          const json = await response.json();
          // Expect the API to return a JSON object with either "link" or "url".
          const uploadedLink = json.link || json.url;
          if (!uploadedLink) {
            throw new Error("Upload succeeded but no image URL was returned.");
          }
          // Set both the parent's link and our local manualUrl.
          setLink(uploadedLink);
          setManualUrl(uploadedLink);
          return uploadedLink;
        }
        const errorText = await response.text();
        throw new Error(`Upload failed (${response.status}): ${errorText}`);
      })();

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: (err) => `Upload error: ${err.message}`,
      });
    }
  }

  // Handle changes in the text input for a manual URL.
  function handleManualUrlChange(ev) {
    let newUrl = ev.target.value;
    // If the URL doesn't appear to be absolute (starting with http:// or https://)
    // and it doesn't start with a '/', then prepend a '/' to treat it as a relative path.
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://') && !newUrl.startsWith('/')) {
      newUrl = '/' + newUrl;
    }
    setManualUrl(newUrl);
    setLink(newUrl);
  }

  return (
    <div className="editable-image-wrapper">
      {link ? (
        <Image
          className="editable-image"
          src={link}
          width={250}
          height={250}
          alt="Editable"
        />
      ) : (
        <div className="editable-placeholder">No image</div>
      )}

      <div className="editable-input-group">
        <label className="editable-file-label">
          
          <span className="editable-button">Upload Image</span>
        </label>
        
      </div>
    </div>
  );
}
