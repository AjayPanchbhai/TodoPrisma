import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  // Handle Prisma errors
  if (err.name.includes("Prisma")) {
    return res.status(500).json({
      error: "Database error occurred",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }

  // Handle validation errors
  if (err.message.includes("required")) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });

  const hello = () => {
    console.log("Hello, world!");
  };
};
