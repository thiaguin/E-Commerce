--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE dev;
DROP DATABASE "e-username";
DROP DATABASE test;




--
-- Drop roles
--

DROP ROLE "e-username";


--
-- Roles
--

CREATE ROLE "e-username";
ALTER ROLE "e-username" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md56f2e158f54ef4bee0bbf5f476d643ebb';






--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: e-username
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO "e-username";

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: e-username
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: e-username
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: e-username
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dev; Type: DATABASE; Schema: -; Owner: e-username
--

CREATE DATABASE dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE dev OWNER TO "e-username";

\connect dev

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.brand (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.brand OWNER TO "e-username";

--
-- Name: brand_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_id_seq OWNER TO "e-username";

--
-- Name: brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "departmentId" integer NOT NULL
);


ALTER TABLE public.category OWNER TO "e-username";

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO "e-username";

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: department; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.department (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.department OWNER TO "e-username";

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_id_seq OWNER TO "e-username";

--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;


--
-- Name: favorite; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.favorite (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.favorite OWNER TO "e-username";

--
-- Name: favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_id_seq OWNER TO "e-username";

--
-- Name: favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.favorite_id_seq OWNED BY public.favorite.id;


--
-- Name: highli; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.highli (
    id integer NOT NULL,
    description character varying NOT NULL,
    query json NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "photoId" integer
);


ALTER TABLE public.highli OWNER TO "e-username";

--
-- Name: highli_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.highli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.highli_id_seq OWNER TO "e-username";

--
-- Name: highli_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.highli_id_seq OWNED BY public.highli.id;


--
-- Name: highlight; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.highlight (
    id integer NOT NULL,
    description character varying NOT NULL,
    query json NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    filename text
);


ALTER TABLE public.highlight OWNER TO "e-username";

--
-- Name: highlight_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.highlight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.highlight_id_seq OWNER TO "e-username";

--
-- Name: highlight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.highlight_id_seq OWNED BY public.highlight.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "productsTotalPrice" integer DEFAULT 0 NOT NULL,
    freight integer NOT NULL,
    delivery character varying NOT NULL,
    "deliveryData" json NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."order" OWNER TO "e-username";

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO "e-username";

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: photo; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.photo (
    id integer NOT NULL,
    filename text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "productId" integer
);


ALTER TABLE public.photo OWNER TO "e-username";

--
-- Name: photo_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photo_id_seq OWNER TO "e-username";

--
-- Name: photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.photo_id_seq OWNED BY public.photo.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.product (
    id integer NOT NULL,
    title character varying NOT NULL,
    description text,
    "technicalInformation" json,
    price integer NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    "ratingQuantity" integer DEFAULT 0 NOT NULL,
    "stockQuantity" integer DEFAULT 0 NOT NULL,
    "hasStock" boolean NOT NULL,
    "saleQuantity" integer DEFAULT 0 NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "brandId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "departmentId" integer NOT NULL,
    filename character varying
);


ALTER TABLE public.product OWNER TO "e-username";

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO "e-username";

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_order; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public.product_order (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    "productPrice" integer NOT NULL,
    "productQuantity" integer NOT NULL,
    evaluate integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.product_order OWNER TO "e-username";

--
-- Name: product_order_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.product_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_order_id_seq OWNER TO "e-username";

--
-- Name: product_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.product_order_id_seq OWNED BY public.product_order.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: e-username
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'CLIENT'::character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO "e-username";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: e-username
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "e-username";

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: e-username
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: brand id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: department id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);


--
-- Name: favorite id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.favorite ALTER COLUMN id SET DEFAULT nextval('public.favorite_id_seq'::regclass);


--
-- Name: highli id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.highli ALTER COLUMN id SET DEFAULT nextval('public.highli_id_seq'::regclass);


--
-- Name: highlight id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.highlight ALTER COLUMN id SET DEFAULT nextval('public.highlight_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: photo id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.photo ALTER COLUMN id SET DEFAULT nextval('public.photo_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_order id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product_order ALTER COLUMN id SET DEFAULT nextval('public.product_order_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.brand (id, name, "createdAt", "updatedAt") FROM stdin;
3	Samsung	2020-06-20 03:13:30.220604+00	2020-06-20 03:13:30.220604+00
4	Xiaomi	2020-06-21 02:05:08.605866+00	2020-06-21 02:05:08.605866+00
7	Apple	2020-06-25 23:07:27.055967+00	2020-06-25 23:07:27.055967+00
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.category (id, name, "createdAt", "updatedAt", "departmentId") FROM stdin;
5	Smartband	2020-06-20 01:46:57.316769+00	2020-06-20 01:46:57.316769+00	11
6	Smartwatch	2020-06-20 01:47:04.444082+00	2020-06-20 01:47:04.444082+00	11
7	Analógico	2020-06-20 01:47:12.654717+00	2020-06-20 01:47:12.654717+00	11
8	Digital	2020-06-20 01:47:17.841502+00	2020-06-20 01:47:17.841502+00	11
9	Futebol	2020-06-20 02:27:17.863287+00	2020-06-20 02:27:17.863287+00	10
10	Basquete	2020-06-20 02:27:22.925044+00	2020-06-20 02:27:22.925044+00	10
11	Futebol Americano	2020-06-20 02:28:36.155156+00	2020-06-20 02:28:36.155156+00	10
12	Vôlei	2020-06-20 02:28:42.084354+00	2020-06-20 02:28:42.084354+00	10
13	Suspense	2020-06-20 02:30:29.78941+00	2020-06-20 02:30:29.78941+00	9
14	Romance	2020-06-20 02:30:35.840974+00	2020-06-20 02:30:35.840974+00	9
15	Comédia	2020-06-20 02:30:45.976387+00	2020-06-20 02:30:45.976387+00	9
16	Didáticos	2020-06-20 02:33:06.73077+00	2020-06-20 02:33:06.73077+00	9
17	Educação	2020-06-20 02:34:02.381537+00	2020-06-20 02:34:02.381537+00	9
18	Autoajuda	2020-06-20 02:35:13.868802+00	2020-06-20 02:35:13.868802+00	9
19	HQ	2020-06-20 02:35:27.079461+00	2020-06-20 02:35:27.079461+00	9
20	Psicologia	2020-06-20 02:36:03.962446+00	2020-06-20 02:36:03.962446+00	9
21	História	2020-06-20 02:36:22.329441+00	2020-06-20 02:36:22.329441+00	9
22	Economia	2020-06-20 02:37:17.537483+00	2020-06-20 02:37:17.537483+00	9
23	Smart TV	2020-06-20 02:42:30.980392+00	2020-06-20 02:42:30.980392+00	8
24	TV Led	2020-06-20 02:42:40.44157+00	2020-06-20 02:42:40.44157+00	8
25	TV de Plasma	2020-06-20 02:43:49.819365+00	2020-06-20 02:43:49.819365+00	8
26	TV LCD	2020-06-20 02:43:58.885865+00	2020-06-20 02:43:58.885865+00	8
27	Playstation 4	2020-06-20 02:48:38.593413+00	2020-06-20 02:48:38.593413+00	7
28	Playstation 3	2020-06-20 02:48:43.135537+00	2020-06-20 02:48:43.135537+00	7
29	Playstation 2	2020-06-20 02:48:46.041836+00	2020-06-20 02:48:46.041836+00	7
30	Xbox One	2020-06-20 02:48:55.27917+00	2020-06-20 02:48:55.27917+00	7
31	Xbox 360	2020-06-20 02:49:00.601002+00	2020-06-20 02:49:00.601002+00	7
32	Nitendo	2020-06-20 02:49:49.451771+00	2020-06-20 02:49:49.451771+00	7
33	PC	2020-06-20 02:49:55.242246+00	2020-06-20 02:49:55.242246+00	7
34	Fogão	2020-06-20 02:50:52.781267+00	2020-06-20 02:50:52.781267+00	6
35	Geladeira	2020-06-20 02:51:05.706136+00	2020-06-20 02:51:05.706136+00	6
36	Máquina de Lavar	2020-06-20 02:51:13.016605+00	2020-06-20 02:51:13.016605+00	6
37	Microondas	2020-06-20 02:51:21.089302+00	2020-06-20 02:51:21.089302+00	6
38	Freezer	2020-06-20 02:51:43.050788+00	2020-06-20 02:51:43.050788+00	6
39	Processador	2020-06-20 02:53:35.794276+00	2020-06-20 02:53:35.794276+00	5
40	Memória	2020-06-20 02:53:42.788986+00	2020-06-20 02:53:42.788986+00	5
41	HD	2020-06-20 02:53:53.168027+00	2020-06-20 02:53:53.168027+00	5
42	SSD	2020-06-20 02:53:58.647653+00	2020-06-20 02:53:58.647653+00	5
43	Placa mãe	2020-06-20 02:54:50.459515+00	2020-06-20 02:54:50.459515+00	5
44	Monitor	2020-06-20 02:55:03.376764+00	2020-06-20 02:55:03.376764+00	5
45	Teclado	2020-06-20 02:55:07.816312+00	2020-06-20 02:55:07.816312+00	5
46	Mouse	2020-06-20 02:55:12.306203+00	2020-06-20 02:55:12.306203+00	5
47	Headset	2020-06-20 02:55:22.037655+00	2020-06-20 02:55:22.037655+00	5
49	Wearable	2020-06-20 02:56:19.132021+00	2020-06-20 02:56:19.132021+00	6
50	Celular Básico	2020-06-20 02:56:33.971353+00	2020-06-20 02:56:33.971353+00	6
51	Acessórios para Celular	2020-06-20 02:56:57.398723+00	2020-06-20 02:56:57.398723+00	6
53	Briquendo para meninas	2020-06-20 03:04:42.224786+00	2020-06-20 03:04:42.224786+00	3
52	Briquendo para meninos	2020-06-20 03:04:29.353817+00	2020-06-20 03:04:29.353817+00	3
54	Briquendo Educativos	2020-06-20 03:05:30.284056+00	2020-06-20 03:05:30.284056+00	3
55	Colecionáveis	2020-06-20 03:05:46.874149+00	2020-06-20 03:05:46.874149+00	3
56	Pelúcia	2020-06-20 03:06:00.418176+00	2020-06-20 03:06:00.418176+00	3
48	Smartphone	2020-06-20 02:56:04.495645+00	2020-06-20 02:56:04.495645+00	4
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.department (id, name, "createdAt", "updatedAt") FROM stdin;
3	Brinquedo	2020-06-20 01:20:29.425422+00	2020-06-20 01:20:29.425422+00
4	Celular	2020-06-20 01:20:53.274556+00	2020-06-20 01:20:53.274556+00
5	Informática	2020-06-20 01:21:27.1308+00	2020-06-20 01:21:27.1308+00
6	Eletrodomésticos	2020-06-20 01:21:55.921459+00	2020-06-20 01:21:55.921459+00
7	Games	2020-06-20 01:22:17.050722+00	2020-06-20 01:22:17.050722+00
8	Televisão	2020-06-20 01:22:35.105635+00	2020-06-20 01:22:35.105635+00
9	Livros	2020-06-20 01:22:59.086778+00	2020-06-20 01:22:59.086778+00
10	Esportes	2020-06-20 01:23:09.150899+00	2020-06-20 01:23:09.150899+00
11	Relógios	2020-06-20 01:23:31.252859+00	2020-06-20 01:23:31.252859+00
\.


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.favorite (id, "userId", "productId", "createdAt", "updatedAt") FROM stdin;
1	4	36	2020-07-05 00:04:29.325614+00	2020-07-05 00:04:29.325614+00
33	1	22	2020-07-05 04:35:41.925866+00	2020-07-05 04:35:41.925866+00
36	1	13	2020-07-05 04:48:14.502677+00	2020-07-05 04:48:14.502677+00
37	1	15	2020-07-05 04:48:20.437942+00	2020-07-05 04:48:20.437942+00
39	1	20	2020-07-05 04:48:28.355194+00	2020-07-05 04:48:28.355194+00
40	1	24	2020-07-05 04:48:33.331842+00	2020-07-05 04:48:33.331842+00
52	1	16	2020-07-05 06:01:16.999298+00	2020-07-05 06:01:16.999298+00
58	1	19	2020-07-05 06:08:31.600947+00	2020-07-05 06:08:31.600947+00
\.


--
-- Data for Name: highli; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.highli (id, description, query, "createdAt", "updatedAt", "photoId") FROM stdin;
\.


--
-- Data for Name: highlight; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.highlight (id, description, query, "createdAt", "updatedAt", filename) FROM stdin;
3	Produtos da marca xiaomi	{"brand":4}	2020-06-25 04:00:47.220959+00	2020-06-25 04:42:21.436479+00	7d062749-2c29-45df-985f-5788f2e14365.jpg
1	Highlight	{"department":4}	2020-06-25 02:22:34.488208+00	2020-06-25 04:42:43.302501+00	b3362c46-bdb9-4076-a9af-1aff9d011f43.jpg
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public."order" (id, "createdAt", "updatedAt", "productsTotalPrice", freight, delivery, "deliveryData", "userId") FROM stdin;
6	2020-07-03 01:42:00.408007+00	2020-07-03 01:42:00.408007+00	418000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
7	2020-07-03 01:42:59.328874+00	2020-07-03 01:42:59.328874+00	418000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
8	2020-07-03 01:49:36.183121+00	2020-07-03 01:49:36.183121+00	418000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
18	2020-07-03 02:23:15.843343+00	2020-07-03 02:23:15.843343+00	8000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
23	2020-07-03 02:53:14.288772+00	2020-07-03 02:53:14.288772+00	18000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
24	2020-07-03 03:01:27.015738+00	2020-07-03 03:01:27.015738+00	10000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
25	2020-07-03 03:06:42.630961+00	2020-07-03 03:06:42.630961+00	10000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
26	2020-07-03 03:07:22.136863+00	2020-07-03 03:07:22.136863+00	10000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
30	2020-07-03 03:44:39.537053+00	2020-07-03 03:44:39.537053+00	40000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
31	2020-07-03 03:47:33.693902+00	2020-07-03 03:47:33.693902+00	24000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
32	2020-07-03 04:00:24.271476+00	2020-07-03 04:00:24.271476+00	40000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
33	2020-07-03 04:01:59.440502+00	2020-07-03 04:01:59.440502+00	16000	10000	FASTEST	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
34	2020-07-03 04:03:37.564566+00	2020-07-03 04:03:37.564566+00	8000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
35	2020-07-03 04:05:36.738246+00	2020-07-03 04:05:36.738246+00	56000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
36	2020-07-03 04:13:02.470551+00	2020-07-03 04:13:02.470551+00	40000	10000	FASTEST	{"cep":"58475-000","logradouro":"","complemento":"","bairro":"","localidade":"Queimadas","uf":"PB","unidade":"","ibge":"2512507","gia":""}	4
37	2020-07-04 07:27:53.685878+00	2020-07-04 07:27:53.685878+00	117000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
38	2020-07-04 07:29:53.43691+00	2020-07-04 07:29:53.43691+00	180000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
39	2020-07-04 07:30:53.08269+00	2020-07-04 07:30:53.08269+00	34200	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
40	2020-07-04 07:32:25.238608+00	2020-07-04 07:32:25.238608+00	17100	1000	CHEAPEST	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
41	2020-07-04 07:33:04.306785+00	2020-07-04 07:33:04.306785+00	17100	1000	CHEAPEST	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
42	2020-07-04 07:35:12.199703+00	2020-07-04 07:35:12.199703+00	9000	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
43	2020-07-04 07:36:42.48184+00	2020-07-04 07:36:42.48184+00	17100	5000	COMMOM	{"cep":"58417-598","logradouro":"Rua Abdon Napy","complemento":"","bairro":"Presidente Médici","localidade":"Campina Grande","uf":"PB","unidade":"","ibge":"2504009","gia":""}	1
\.


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.photo (id, filename, "createdAt", "updatedAt", "productId") FROM stdin;
4	50084f19-18d0-4e48-b93b-894dfdc86b6b.jpeg	2020-06-20 03:46:00.63028+00	2020-06-20 03:46:00.63028+00	24
5	1fbd1703-4bcf-42bc-8b8c-419e717ec021.jpg	2020-06-20 03:48:05.086183+00	2020-06-20 03:48:05.086183+00	23
6	0ca6cc74-5112-421b-926c-bcdd25dd855b.jpg	2020-06-20 03:51:47.522906+00	2020-06-20 03:51:47.522906+00	22
7	ec583ee8-c308-4ed7-8ce9-f540086ca6ac.jpg	2020-06-20 03:52:45.062702+00	2020-06-20 03:52:45.062702+00	21
8	f856b6ee-a829-4bdb-8a18-06e64a61373e.jpg	2020-06-20 03:53:52.804974+00	2020-06-20 03:53:52.804974+00	20
9	958ea182-5f5a-4f83-96d8-4be119aa7267.jpg	2020-06-20 03:55:03.66339+00	2020-06-20 03:55:03.66339+00	19
10	f6e532af-1733-49db-b532-71dc55a5583c.jpg	2020-06-20 03:56:17.837989+00	2020-06-20 03:56:17.837989+00	18
11	4042b5c8-e89e-428a-bf70-4fb0a0e7a009.png	2020-06-20 03:58:04.379987+00	2020-06-20 03:58:04.379987+00	17
12	fbe02ed9-32bb-4f97-a0a5-e2a842c2eb66.jpg	2020-06-20 03:59:46.201114+00	2020-06-20 03:59:46.201114+00	16
13	5da935dc-b9ee-4080-bb33-564cbe43ecc3.jpg	2020-06-20 04:01:51.054373+00	2020-06-20 04:01:51.054373+00	15
14	ad06f80d-8477-4971-ab15-b62b77101bfe.png	2020-06-20 04:05:25.726146+00	2020-06-20 04:05:25.726146+00	17
15	1e65fc99-d922-45df-bfcb-9c9a98bf70f0.jpg	2020-06-20 04:05:51.938992+00	2020-06-20 04:05:51.938992+00	16
16	ec68838c-453c-4a97-a79a-9c9ae2bfa5dc.jpg	2020-06-20 04:06:44.661242+00	2020-06-20 04:06:44.661242+00	15
17	b2dcbaa9-0a41-471f-88d5-84c931ce003d.jpg	2020-06-20 04:08:28.624278+00	2020-06-20 04:08:28.624278+00	14
18	27ca52d6-b308-45a0-ba0a-64911ed5938d.jpeg	2020-06-20 04:09:58.005394+00	2020-06-20 04:09:58.005394+00	13
19	e353089b-c267-4eff-9ef2-94ff91ccea78.jpeg	2020-06-20 04:11:34.300722+00	2020-06-20 04:11:34.300722+00	12
20	6f049e4a-f039-41c1-b334-e5a7bb4defa3.jpeg	2020-06-20 04:12:31.103097+00	2020-06-20 04:12:31.103097+00	11
21	5ffb0512-8032-4e87-b664-6736f46224fe.jpg	2020-06-20 04:13:21.720589+00	2020-06-20 04:13:21.720589+00	10
22	75f91ab9-4e43-45e2-9bc4-82ecc27c4ebc.jpg	2020-06-20 04:14:17.723886+00	2020-06-20 04:14:17.723886+00	9
23	d5e439c9-a401-4400-8e4a-49358d60aa69.jpeg	2020-06-20 04:15:10.038859+00	2020-06-20 04:15:10.038859+00	8
24	a03a8ff1-29fb-4d6d-b21f-c72981fda353.jpg	2020-06-20 04:16:15.030335+00	2020-06-20 04:16:15.030335+00	7
25	a4b554b7-a8ef-4001-aca9-189c8c1280df.jpg	2020-06-20 04:17:07.801307+00	2020-06-20 04:17:07.801307+00	6
26	6e72c49b-f600-4551-ab46-4852c2daecb9.jpeg	2020-06-20 04:18:10.674228+00	2020-06-20 04:18:10.674228+00	5
32	089b20ad-6506-4ea8-8732-06e6f6f26d4d.jpg	2020-06-21 02:15:33.365995+00	2020-06-21 02:15:33.365995+00	36
33	51a759f2-a6e5-4ae7-9aff-6075f747ca13.jpg	2020-06-21 02:16:06.085804+00	2020-06-21 02:16:06.085804+00	36
40	0d200f73-8460-40c9-a760-39a420788c25.jpg	2020-06-26 03:52:44.010395+00	2020-06-26 03:52:44.010395+00	37
41	e442354b-a41c-4980-8943-b2fba432ae6a.jpeg	2020-06-26 03:52:44.010395+00	2020-06-26 03:52:44.010395+00	37
42	a23c7b57-0319-4c6a-9a44-cf4ce8a70d72.png	2020-06-26 03:52:44.010395+00	2020-06-26 03:52:44.010395+00	37
43	708f199e-daa2-4ab6-a3ce-3e77fd619a98.jpg	2020-06-26 05:15:47.022307+00	2020-06-26 05:15:47.022307+00	37
44	a8689b01-862e-4f80-8f8f-338f87b06f23.jpeg	2020-06-26 05:15:47.022307+00	2020-06-26 05:15:47.022307+00	37
45	137ced98-8b78-443a-81e4-278ed841f48c.png	2020-06-26 05:15:47.022307+00	2020-06-26 05:15:47.022307+00	37
46	6219ea45-9033-4fc7-aab3-7f6a0662ec74.jpg	2020-06-27 21:44:51.601027+00	2020-06-27 21:44:51.601027+00	37
47	68f023f1-ced6-45ac-95d1-98acdee22838.jpeg	2020-06-27 21:44:51.601027+00	2020-06-27 21:44:51.601027+00	37
48	4fb5fc9c-c465-44f5-b550-cf08cc4e0c48.png	2020-06-27 21:44:51.601027+00	2020-06-27 21:44:51.601027+00	37
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.product (id, title, description, "technicalInformation", price, rating, "ratingQuantity", "stockQuantity", "hasStock", "saleQuantity", discount, "createdAt", "updatedAt", "brandId", "categoryId", "departmentId", filename) FROM stdin;
20	Samsung Galaxy y	Celular basicão	{"RAM":"2B"}	10000	73	3	99	t	1	10	2020-06-20 03:27:34.874309+00	2020-07-04 06:50:56.574579+00	3	48	4	f856b6ee-a829-4bdb-8a18-06e64a61373e.jpg
22	Samsung Note 8	Celular bacana	{"RAM":"2B"}	10000	100	1	100	t	0	10	2020-06-20 03:39:08.188206+00	2020-06-20 03:51:47.522906+00	3	48	4	0ca6cc74-5112-421b-926c-bcdd25dd855b.jpg
19	Samsung A50	Celular bom	{"RAM":"2B"}	150000	100	1	100	t	0	10	2020-06-20 03:26:42.35184+00	2020-06-20 03:55:03.66339+00	3	48	4	958ea182-5f5a-4f83-96d8-4be119aa7267.jpg
18	Samsung A30	Celular bom	{"RAM":"2B"}	120000	100	1	100	t	0	10	2020-06-20 03:26:28.162611+00	2020-06-20 03:56:17.837989+00	3	48	4	f6e532af-1733-49db-b532-71dc55a5583c.jpg
16	Samsung J7	Celular de razoável	{"RAM":"2B"}	80000	100	1	100	t	0	10	2020-06-20 03:26:01.38196+00	2020-06-20 04:05:51.938992+00	3	48	4	1e65fc99-d922-45df-bfcb-9c9a98bf70f0.jpg
14	Samsung J2	Celular de entrada	{"RAM":"2B"}	50000	100	1	100	t	0	10	2020-06-20 03:25:33.302123+00	2020-06-20 04:08:28.624278+00	3	48	4	b2dcbaa9-0a41-471f-88d5-84c931ce003d.jpg
6	Samsung S10	Celular samsung top!	{"RAM":"4GB"}	150000	100	1	100	t	0	10	2020-06-20 03:23:27.491333+00	2020-06-20 04:17:07.801307+00	3	48	4	a4b554b7-a8ef-4001-aca9-189c8c1280df.jpg
17	Samsung J7 pro	Celular de razoável	{"RAM":"2B"}	120000	87	3	99	t	1	10	2020-06-20 03:26:11.219429+00	2020-07-04 07:28:14.326575+00	3	48	4	ad06f80d-8477-4971-ab15-b62b77101bfe.png
24	Samsung Z Fliṕ	Celular mais top de todos	{"RAM":"2B"}	10000	77	6	97	t	3	10	2020-06-20 03:43:16.451152+00	2020-07-04 07:29:00.163536+00	3	48	4	50084f19-18d0-4e48-b93b-894dfdc86b6b.jpeg
37	iPhone XR	iPhone muito top	{"RAM":"6GB","Camêra Traseira":"12MP","Camêra Frontal":"7MP","Memória Interna":"128GB","Tamanho":"6,1 polegadas"}	400000	53	18	97	t	5	5	2020-06-25 23:16:17.843518+00	2020-07-04 07:29:07.125154+00	7	48	4	4fb5fc9c-c465-44f5-b550-cf08cc4e0c48.png
23	Samsung Note 10 Lite	Celular bom	{"RAM":"2B"}	10000	73	3	99	t	1	10	2020-06-20 03:40:09.930681+00	2020-07-04 06:30:57.427787+00	3	48	4	1fbd1703-4bcf-42bc-8b8c-419e717ec021.jpg
15	Samsung J5	Celular de entrada	{"RAM":"2B"}	50000	75	4	96	t	4	10	2020-06-20 03:25:45.335881+00	2020-07-04 07:30:06.644937+00	3	48	4	ec68838c-453c-4a97-a79a-9c9ae2bfa5dc.jpg
21	Samsung Note 10	Celular muito bom	{"RAM":"2B"}	10000	80	4	96	t	4	10	2020-06-20 03:38:57.708597+00	2020-07-04 07:35:24.794461+00	3	48	4	ec583ee8-c308-4ed7-8ce9-f540086ca6ac.jpg
12	Samsung S5 mini	Celular samsung muito bom, mas ultrapassado	{"RAM":"2B"}	8000	100	1	100	t	0	10	2020-06-20 03:25:07.867581+00	2020-06-20 04:11:34.300722+00	3	48	4	e353089b-c267-4eff-9ef2-94ff91ccea78.jpeg
11	Samsung S5	Celular samsung muito bom, mas ultrapassado	{"RAM":"3B"}	10000	100	1	100	t	0	10	2020-06-20 03:24:52.253906+00	2020-06-20 04:12:31.103097+00	3	48	4	6f049e4a-f039-41c1-b334-e5a7bb4defa3.jpeg
10	Samsung S6	Celular samsung muito bom!	{"RAM":"4GB"}	150000	100	1	100	t	0	10	2020-06-20 03:24:26.801706+00	2020-06-20 04:13:21.720589+00	3	48	4	5ffb0512-8032-4e87-b664-6736f46224fe.jpg
9	Samsung S7	Celular samsung muito bom!	{"RAM":"4GB"}	150000	100	1	100	t	0	10	2020-06-20 03:24:22.052231+00	2020-06-20 04:14:17.723886+00	3	48	4	75f91ab9-4e43-45e2-9bc4-82ecc27c4ebc.jpg
8	Samsung S8	Celular samsung muito bom!	{"RAM":"4GB"}	150000	100	1	100	t	0	10	2020-06-20 03:24:01.005256+00	2020-06-20 04:15:10.038859+00	3	48	4	d5e439c9-a401-4400-8e4a-49358d60aa69.jpeg
7	Samsung S9	Celular samsung muito bom!	{"RAM":"4GB"}	150000	100	1	100	t	0	10	2020-06-20 03:23:37.137627+00	2020-06-20 04:16:15.030335+00	3	48	4	a03a8ff1-29fb-4d6d-b21f-c72981fda353.jpg
5	Samsung S20	Celular samsung top de verdade!	{"RAM":"4GB"}	200000	100	1	100	t	0	10	2020-06-20 03:22:44.399184+00	2020-06-20 04:18:10.674228+00	3	48	4	6e72c49b-f600-4551-ab46-4852c2daecb9.jpeg
13	Samsung S4 mini	Celular samsung muito bom, mas ultrapassado	{"RAM":"2B"}	8000	73	6	76	t	24	10	2020-06-20 03:25:11.980919+00	2020-07-04 07:22:26.840064+00	3	48	4	27ca52d6-b308-45a0-ba0a-64911ed5938d.jpeg
36	Mi Smart Band 4	Smartband boa	{"RAM":"2B"}	18000	65	23	91	t	11	5	2020-06-21 02:09:55.422745+00	2020-07-04 07:36:48.539514+00	4	5	11	51a759f2-a6e5-4ae7-9aff-6075f747ca13.jpg
\.


--
-- Data for Name: product_order; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public.product_order (id, "orderId", "productId", "productPrice", "productQuantity", evaluate) FROM stdin;
14	32	13	7200	5	40
7	18	13	7200	1	60
15	33	13	7200	2	80
21	37	17	108000	1	80
20	37	24	9000	1	40
1	6	37	380000	1	60
2	6	36	17100	1	20
22	38	15	45000	4	80
8	23	36	17100	1	80
23	39	36	17100	2	80
24	40	36	17100	1	100
25	41	36	17100	1	60
26	42	21	9000	1	80
27	43	36	17100	1	60
9	24	24	9000	1	0
10	25	24	9000	1	0
12	30	13	7200	5	0
13	31	13	7200	3	0
16	34	13	7200	1	0
17	35	13	7200	7	0
11	26	23	9000	1	0
18	36	21	9000	3	0
19	36	20	9000	1	0
3	7	37	380000	1	0
4	7	36	17100	1	0
5	8	37	380000	1	60
6	8	36	17100	1	100
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: e-username
--

COPY public."user" (id, username, password, role, "createdAt", "updatedAt") FROM stdin;
1	username	$2b$15$BDt1EY/BpzO8rtptEUFcT.xWFCHzNAukKFXphHRLSlCfDRT8jO4mC	ADMIN	2020-06-14 21:24:37.423791+00	2020-06-14 21:24:37.423791+00
2	thiago	$2b$15$KkSt4t83XSYldx9h1GUs7O1YyHl30Pz7O6PSQaK1cFPWlq9Cw1H9K	CLIENT	2020-06-28 04:22:26.339362+00	2020-06-28 04:22:26.339362+00
3	novouser	$2b$15$UCn0mIr3sfEIQFvWiIWPnuHsoFtEuaISyKWz452bQaEINaZcJFRFm	CLIENT	2020-07-01 22:27:06.816552+00	2020-07-01 22:27:06.816552+00
4	redson	$2b$15$Ht47Cmsv9O8rtazT44JroOwSiLD.CW6rRuB9K9X2/uyTPvFOcHJgC	CLIENT	2020-07-03 04:11:45.325239+00	2020-07-03 04:11:45.325239+00
\.


--
-- Name: brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.brand_id_seq', 7, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.category_id_seq', 56, true);


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.department_id_seq', 11, true);


--
-- Name: favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.favorite_id_seq', 61, true);


--
-- Name: highli_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.highli_id_seq', 1, false);


--
-- Name: highlight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.highlight_id_seq', 3, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.order_id_seq', 74, true);


--
-- Name: photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.photo_id_seq', 48, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.product_id_seq', 37, true);


--
-- Name: product_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.product_order_id_seq', 58, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: e-username
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: highlight PK_0f4191998a1e1e8f8455f1d4adb; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.highlight
    ADD CONSTRAINT "PK_0f4191998a1e1e8f8455f1d4adb" PRIMARY KEY (id);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: favorite PK_495675cec4fb09666704e4f610f; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY (id);


--
-- Name: photo PK_723fa50bf70dcfd06fb5a44d4ff; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY (id);


--
-- Name: product_order PK_9849f0d8ce095e50e752616f691; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT "PK_9849f0d8ce095e50e752616f691" PRIMARY KEY (id);


--
-- Name: department PK_9a2213262c1593bffb581e382f5; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: brand PK_a5d20765ddd942eb5de4eee2d7f; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: highli PK_fd0b6bd9e4917e9edce0933e429; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.highli
    ADD CONSTRAINT "PK_fd0b6bd9e4917e9edce0933e429" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: product UQ_f7bf944ad9f1034110e8c2133ab; Type: CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "UQ_f7bf944ad9f1034110e8c2133ab" UNIQUE (title);


--
-- Name: highli FK_071126ac7b45bd3a426cc1f2a06; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.highli
    ADD CONSTRAINT "FK_071126ac7b45bd3a426cc1f2a06" FOREIGN KEY ("photoId") REFERENCES public.photo(id);


--
-- Name: product_order FK_42291ebe165058deecb017e652b; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT "FK_42291ebe165058deecb017e652b" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- Name: product_order FK_717057f3f11a007030181422152; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT "FK_717057f3f11a007030181422152" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: favorite FK_83b775fdebbe24c29b2b5831f2d; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: photo FK_914c56465eb2bdf14c13352c463; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT "FK_914c56465eb2bdf14c13352c463" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: product FK_a35b7bec50d3f2d2a706d0462b2; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_a35b7bec50d3f2d2a706d0462b2" FOREIGN KEY ("departmentId") REFERENCES public.department(id);


--
-- Name: favorite FK_b8e337759b77baa0a4055d1894e; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT "FK_b8e337759b77baa0a4055d1894e" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: product FK_bb7d3d9dc1fae40293795ae39d6; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES public.brand(id);


--
-- Name: category FK_ca84972726b2771ef958337d54b; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_ca84972726b2771ef958337d54b" FOREIGN KEY ("departmentId") REFERENCES public.department(id);


--
-- Name: order FK_caabe91507b3379c7ba73637b84; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: product FK_ff0c0301a95e517153df97f6812; Type: FK CONSTRAINT; Schema: public; Owner: e-username
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: e-username; Type: DATABASE; Schema: -; Owner: e-username
--

CREATE DATABASE "e-username" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE "e-username" OWNER TO "e-username";

\connect -reuse-previous=on "dbname='e-username'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: e-username
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO "e-username";

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: e-username
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3 (Debian 11.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: test; Type: DATABASE; Schema: -; Owner: e-username
--

CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE test OWNER TO "e-username";

\connect test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

