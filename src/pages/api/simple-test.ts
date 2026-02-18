// En basit API - hiç Prisma yok
export default function handler(req: any, res: any) {
  res.status(200).json({
    message: 'API çalışıyor!',
    env: process.env.DATABASE_URL ? 'DATABASE_URL var' : 'DATABASE_URL yok',
    time: new Date().toISOString()
  });
}
