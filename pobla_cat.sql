PGDMP     &                    {            shoppie #   14.8 (Ubuntu 14.8-0ubuntu0.22.04.1) #   14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)     `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            c           1262    72622    shoppie    DATABASE     \   CREATE DATABASE shoppie WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'es_CL.UTF-8';
    DROP DATABASE shoppie;
                postgres    false            �            1259    75384 	   categoria    TABLE     �   CREATE TABLE public.categoria (
    idcat integer NOT NULL,
    nombrecat character varying(255),
    desccat character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            �            1259    75383    categoria_idcat_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_idcat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.categoria_idcat_seq;
       public          postgres    false    220            d           0    0    categoria_idcat_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.categoria_idcat_seq OWNED BY public.categoria.idcat;
          public          postgres    false    219            �           2604    75387    categoria idcat    DEFAULT     r   ALTER TABLE ONLY public.categoria ALTER COLUMN idcat SET DEFAULT nextval('public.categoria_idcat_seq'::regclass);
 >   ALTER TABLE public.categoria ALTER COLUMN idcat DROP DEFAULT;
       public          postgres    false    220    219    220            ]          0    75384 	   categoria 
   TABLE DATA           X   COPY public.categoria (idcat, nombrecat, desccat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   g       e           0    0    categoria_idcat_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.categoria_idcat_seq', 3, true);
          public          postgres    false    219            �           2606    75391    categoria categoria_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (idcat);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            postgres    false    220            ]   �   x�}�A
�@����)�GMwJ.´E�y�SLM*:�3t�ZI���'�f��u�#�����Z���2�ge�D��ǋ�ci�A��q�p��#e��EYd"�}QՍ(I���[����h�sOJj���x��$�X��}W��؊�(K�#�jc��Uw�w�;����n\軫�y��}Wzt)�o�Q�     