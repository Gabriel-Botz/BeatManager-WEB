import { Admin, Evento } from "./types";

export const admins: Admin[] = [
  {
    id: "1",
    nome: "Admin",
    email: "admin@beatmanager.com",
    senha: "123456",
  },
];

export const eventos: Evento[] = [
  {
    id: "1",
    adminId: "1",
    nome: "Festival Eletrônico",
    data: "2026-09-15",
    local: "São Paulo, SP",
    descricao: "O maior festival de música eletrônica do Brasil com DJs internacionais.",
    capa: "/eventos/festival.jpg",
    categoria: "Festival",
  },
  {
    id: "2",
    adminId: "1",
    nome: "Techno Night",
    data: "2026-08-20",
    local: "Rio de Janeiro, RJ",
    descricao: "Noite de techno com os melhores DJs nacionais.",
    capa: "/eventos/techno.jpg",
    categoria: "Show",
  },
  {
    id: "3",
    adminId: "1",
    nome: "Rave Underground",
    data: "2026-10-05",
    local: "Belo Horizonte, MG",
    descricao: "Rave underground com som de alta qualidade.",
    capa: "/eventos/rave.jpg",
    categoria: "Rave",
  },
  {
    id: "4",
    adminId: "2",
    nome: "Deep House Session",
    data: "2026-08-25",
    local: "Curitiba, PR",
    descricao: "Sessão de deep house em ambiente intimista.",
    capa: "/eventos/deep-house.jpg",
    categoria: "Show",
  },
  {
    id: "5",
    adminId: "2",
    nome: "EDM Festival",
    data: "2026-11-10",
    local: "Florianópolis, SC",
    descricao: "Festival de EDM com palcos ao ar livre na praia.",
    capa: "/eventos/edm.jpg",
    categoria: "Festival",
  },
  {
    id: "6",
    adminId: "1",
    nome: "Drum & Bass Night",
    data: "2026-09-30",
    local: "Porto Alegre, RS",
    descricao: "Noite de drum & bass com artistas internacionais.",
    capa: "/eventos/dnb.jpg",
    categoria: "Show",
  },
];
