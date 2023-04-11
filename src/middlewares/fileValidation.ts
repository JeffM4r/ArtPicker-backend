import path from "path"

export function fileCheck(file) {
const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
const fileTypes = ['png', 'jpeg', 'jpg', 'gif']

const fileExtension = path.extname(file.originalname);

if (!fileTypes.includes(fileExtension) || !mimeTypes.includes(file.memetype)) {
  return false;
}

return true
}