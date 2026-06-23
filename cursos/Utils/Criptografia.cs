
namespace Cursos.Utils
{
    public class Criptografia
    {
        public static string GerarHash(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        public static bool CompararHash(string senhaForm, string senhaBanco)
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
        }

        internal static object GerarHash(object value)
        {
            throw new NotImplementedException();
        }

        internal static bool ValidarHash(string senha, string v)
        {
            throw new NotImplementedException();
        }
    }
}

