export function fileCheck(file): boolean {
const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
const Extensions = ['/', 'i', 'R']
const fileMimeType = file.replace("data:", "").split(';base64,')[0];
const fileExtension = file.split(';base64,').pop().charAt(0);

if (!Extensions.includes(fileExtension) || !mimeTypes.includes(fileMimeType)) {
  return false;
}

return true
}