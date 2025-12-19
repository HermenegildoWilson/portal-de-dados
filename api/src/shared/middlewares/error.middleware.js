export function errorMiddleware(error, req, res, next) {
  console.error("Meu cara em acção: "+error);

  return res.status(500).json({
    success: false,
    error: error,
    message: error.message || "Erro interno do servidor...",
  });
}
