import { prisma } from "@/lib/prisma";

export default async function DesenvolvePage() {
  const projetos = await prisma.project.findMany({
    where: { apiKeyName: "Projeto Desenvolve" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-inter px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">
        Projeto Desenvolve — Projetos
      </h1>
      <div className="space-y-4">
        {projetos.length === 0 ? (
          <p className="text-slate-500">
            Nenhum projeto do Projeto Desenvolve encontrado.
          </p>
        ) : (
          projetos.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4"
            >
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-slate-400">{p.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
