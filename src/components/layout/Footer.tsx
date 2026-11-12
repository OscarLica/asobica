import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-t from-gray-950 to-transparent mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-white mb-2">ASOBICA</h3>
            <p className="text-gray-400 text-sm">
              Plataforma oficial de billar de los Interclubes Asobica 2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Reglamento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">
              Email: info@asobica.com<br />
              Teléfono: +505 XXXX XXXX
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 ASOBICA. Todos los derechos reservados.</p>
          <p className="mt-1">Plataforma desarrollada con ❤️ para el billar profesional</p>
        </div>
      </div>
    </footer>
  );
}
