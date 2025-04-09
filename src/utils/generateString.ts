export function generateVietnameseUsername() {
  // Common Vietnamese first names and last names (simplified)
  const firstNames = [
    "Nguyen",
    "Tran",
    "Le",
    "Pham",
    "Hoang",
    "Vu",
    "Dang",
    "Bui",
    "Do",
    "Duong",
  ];
  const middleNames = [
    "Van",
    "Thi",
    "Quang",
    "Minh",
    "Duc",
    "Huy",
    "Khanh",
    "Phuong",
    "Thanh",
    "Tuan",
  ];
  const lastNames = [
    "Hao",
    "Linh",
    "Nam",
    "Anh",
    "Dung",
    "Hoa",
    "Mai",
    "Lan",
    "Nhi",
    "Truc",
  ];

  // Get random elements
  const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomMiddle =
    middleNames[Math.floor(Math.random() * middleNames.length)];
  const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Up to 999

  // Combine elements with Vietnamese naming pattern
  const patterns = [
    `${randomFirst}${randomMiddle}${randomLast}${randomNumber}`,
    `${randomFirst}${randomLast}${randomMiddle}${randomNumber}`,
    `${randomLast}${randomFirst}${randomNumber}`,
    `${randomFirst}${randomNumber}${randomLast}`,
  ];

  // Select random pattern and convert to lowercase
  const username =
    patterns[Math.floor(Math.random() * patterns.length)].toLowerCase();

  return username;
}

export function generateSecurePassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Ensure at least one of each
  let password =
    lowercase[Math.floor(Math.random() * lowercase.length)] + // lowercase
    uppercase[Math.floor(Math.random() * uppercase.length)] + // uppercase
    numbers[Math.floor(Math.random() * numbers.length)]; // number

  const allChars = lowercase + uppercase + numbers;

  // Fill remaining 5 characters
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
