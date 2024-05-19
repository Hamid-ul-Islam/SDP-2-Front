export function getBatchNumberFromStudentId(studentId) {
  const pattern = /^(\d{2})(02)(\d{2})(\d{3})$/;
  const match = studentId.match(pattern);

  if (!match) {
    return null; // Return null or any other indication of an invalid ID
  }

  const batchNumber = match[3]; // The batch number is the third capturing group in the regex
  return batchNumber;
}
