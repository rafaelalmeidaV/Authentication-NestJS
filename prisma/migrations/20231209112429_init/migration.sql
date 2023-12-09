-- CreateTable
CREATE TABLE "User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLogin" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    CONSTRAINT "User_idLogin_fkey" FOREIGN KEY ("idLogin") REFERENCES "Login" ("idLogin") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Login" (
    "idLogin" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");
