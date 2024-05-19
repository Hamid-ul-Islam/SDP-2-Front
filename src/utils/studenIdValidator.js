export function validateStudentId(studentId) {
  const pattern = /^(\d{2})(02)(\d{2})(\d{3})$/;
  const match = studentId.match(pattern);

  if (!match) {
    return false;
  }

  const [_, admissionYear, departmentCode, batchNumber, rollNumber] = match;

  // Convert admission year to full year
  const fullAdmissionYear = 2000 + parseInt(admissionYear, 10);

  // Check for the admission year range
  if (fullAdmissionYear < 1985 || fullAdmissionYear > 2024) {
    return false;
  }

  if (departmentCode !== "02") {
    return false;
  }

  // Check for the batch number range
  const batchNumberInt = parseInt(batchNumber, 10);
  if (batchNumberInt < 1 || batchNumberInt > 43) {
    return false;
  }

  // Check for the roll number range
  const rollNumberInt = parseInt(rollNumber, 10);
  if (rollNumberInt < 1 || rollNumberInt > 999) {
    return false;
  }

  return true;
}
