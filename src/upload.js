//const headshotUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`;
const cloudinaryToken = `Bearer ${import.meta.env.VITE_CLOUDINARY_API_SECRET}`;

export const uploadHeadshot = async (file) => {
  const headshotUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const resp = await fetch(headshotUrl, {
    method: 'POST',
    headers: {
      Authorization: cloudinaryToken,
      'Content-Type': 'application/json',
    },
    body: formData,
  });

  const data = await resp.json();
  return data.secure_url; // this is the URL Airtable needs
};
