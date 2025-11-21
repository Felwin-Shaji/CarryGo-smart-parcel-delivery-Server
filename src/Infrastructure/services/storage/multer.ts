import multer from "multer";

export const agencyuploadKYC = multer({ storage: multer.memoryStorage() }).fields([
  { name: "tradeLicenseDocument", maxCount: 1 },
  { name: "PAN_photo", maxCount: 1 },
  { name: "gst_certificate", maxCount: 1 },
]);

export type AgencyKYCFileFields = {
  tradeLicenseDocument?: Express.Multer.File[];
  PAN_photo?: Express.Multer.File[];
  gst_certificate?: Express.Multer.File[];
};

export const agencyAddHub = multer({storage:multer.memoryStorage()}).fields([
  {name:"verificationImage",maxCount:1}
])

export type AgencyAddHubFields = {
  verificationImage?:Express.Multer.File[];
}

