export function fileCheck(file: string): boolean {
const mimeTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
const Extensions: string[] = ['/', 'i', 'R']
const fileMimeType: string = file.replace("data:", "").split(';base64,')[0];
const fileExtension: string = file.split(';base64,').pop().charAt(0);

if (!Extensions.includes(fileExtension) || !mimeTypes.includes(fileMimeType)) {
  return false;
}

return true
}