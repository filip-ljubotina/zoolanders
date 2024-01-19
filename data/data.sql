
COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.action (
    action_id bigint NOT NULL,
    action_name character varying(255),
    action_type character varying(255),
    location_name character varying(255),
    map_view_criteria json,
    qualifications_json json,
    app_user_id bigint,
    station_station_id bigint
);


ALTER TABLE public.action OWNER to postgres;


ALTER TABLE public.action ALTER COLUMN action_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.action_action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


CREATE TABLE public.animal (
    animal_id bigint NOT NULL,
    breed character varying(255),
    current_position json,
    description character varying(255),
    image bytea,
    name character varying(255),
    station_station_id bigint
);


ALTER TABLE public.animal OWNER to postgres;


ALTER TABLE public.animal ALTER COLUMN animal_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.animal_animal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.animal_comment (
    animal_comment_id bigint NOT NULL,
    comment character varying(255),
    user_name character varying(255),
    action_action_id bigint,
    animal_animal_id bigint
);


ALTER TABLE public.animal_comment OWNER to postgres;

CREATE TABLE public.app_user (
    id bigint NOT NULL,
    app_user_role character varying(255),
    email character varying(255),
    enabled boolean,
    first_name character varying(255),
    image oid,
    last_name character varying(255),
    locked boolean,
    password character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.app_user OWNER to postgres;


CREATE TABLE public.confirmation_token (
    id bigint NOT NULL,
    confirmed_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    token character varying(255) NOT NULL,
    app_user_id bigint NOT NULL
);


ALTER TABLE public.confirmation_token OWNER to postgres;


CREATE SEQUENCE public.confirmation_token_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.confirmation_token_sequence OWNER to postgres;


CREATE TABLE public.data_dump (
    c1 text
);


ALTER TABLE public.data_dump OWNER to postgres;


CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER to postgres;


CREATE TABLE public.map_comment (
    map_comment_id bigint NOT NULL,
    comment character varying(255),
    position_coordinates json,
    user_name character varying(255),
    action_action_id bigint
);


ALTER TABLE public.map_comment OWNER to postgres;

CREATE TABLE public.past_locations (
    past_location_id bigint NOT NULL,
    position_coordinates json,
    action_action_id bigint,
    animal_id bigint,
    searcher_id bigint
);


ALTER TABLE public.past_locations OWNER to postgres;



CREATE TABLE public.past_routes (
    past_routes_id bigint NOT NULL,
    route_waypoints json,
    action_action_id bigint,
    searcher_id bigint
);


ALTER TABLE public.past_routes OWNER to postgres;



CREATE TABLE public.searcher_in_the_field (
    searcher_in_the_field_id bigint NOT NULL,
    current_position json,
    qualification character varying(255),
    action_id bigint,
    user_id bigint,
    station_id bigint
);


ALTER TABLE public.searcher_in_the_field OWNER to postgres;



ALTER TABLE public.searcher_in_the_field ALTER COLUMN searcher_in_the_field_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.searcher_in_the_field_searcher_in_the_field_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE public.station (
    station_id bigint NOT NULL,
    coordinates_json json,
    station_name character varying(255)
);


ALTER TABLE public.station OWNER to postgres;


CREATE TABLE public.station_manager (
    station_mangaer_id bigint NOT NULL,
    user_id bigint,
    station_id bigint
);


ALTER TABLE public.station_manager OWNER to postgres;


ALTER TABLE public.station_manager ALTER COLUMN station_mangaer_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.station_manager_station_mangaer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


ALTER TABLE public.station ALTER COLUMN station_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.station_station_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


CREATE SEQUENCE public.student_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_sequence OWNER to postgres;



CREATE TABLE public.task (
    task_id bigint NOT NULL,
    completed boolean NOT NULL,
    route_waypoints json,
    task_comment character varying(255),
    task_to_do character varying(255),
    action_action_id bigint,
    searcher_id bigint
);


ALTER TABLE public.task OWNER to postgres;


INSERT INTO public.station VALUES (1, '{"center":[43.32,17.05],"HELICOPTER":[[43.391008905607436,16.915435353979092],[43.34979490810872,16.92010618949189],[43.276095738562276,16.942178258855705],[43.20371275387646,17.04341311018797],[43.08836811033851,17.36813414460869],[43.17088205743465,17.43626625750531],[43.368951781866684,17.111580371171982],[43.43312447051426,16.95416129819884],[43.391008905607436,16.915435353979092]],"BOAT":[[43.30340458933824,16.9673061453274],[43.17048054373399,17.084081304726453],[43.05272641010447,17.391803503115256],[43.11427510450872,17.39253494178149],[43.35316685327538,16.978866735773522],[43.33419423444067,16.974225148780278],[43.30340458933824,16.9673061453274]],"DRONE":[[43.25,17.1],[43.28,17.16],[43.35,17.07],[43.35,17.0]],"CAR":[[43.237699765970746,17.111973162209097],[43.24060190502166,17.143839705043717],[43.408941223358994,16.90965594387987],[43.39684890125659,16.897366015535027],[43.237699765970746,17.111973162209097]],"FOOT":[[43.25,17.1],[43.27,17.14],[43.32,17.05],[43.31,17.02]],"CROSS_MOTOR":[[43.30353210950861,17.026190271132236],[43.2984316113118,17.03422919905617],[43.31411843818722,17.06099173736237],[43.328120390821624,17.044556073252153],[43.36756194160344,17.011379953134274],[43.360143018633465,16.993907122237815],[43.31497577060648,17.037201741579118],[43.30353210950861,17.026190271132236]]}', 'biokovo');
INSERT INTO public.station VALUES (2, '{"center":[45.34891363712481,16.890380535354808],"HELICOPTER":[[45.50481224893187,16.438357923293893],[45.235183465852344,16.828211754515053],[45.3084590219743,17.008609955918075],[45.652264019612545,16.481944065914945],[45.62263529058805,16.44199010184539],[45.50481224893187,16.438357923293893]],"BOAT":[[45.23081576707497,16.840866332152956],[45.28182314816044,16.9499931705964],[45.50375340476546,16.46285096378392],[45.46580509847715,16.31181941937706],[45.37450221107886,16.598168243453586],[45.35364730573647,16.645311037661884],[45.23081576707497,16.840866332152956]],"DRONE":[[45.519781992134995,16.590464214335867],[45.51411259547288,16.52528617383706],[45.42111609034603,16.586418680787972],[45.39081973215244,16.74734101526147],[45.46243178179611,16.756331089812676],[45.51505753458315,16.647551187738884],[45.519781992134995,16.590464214335867]],"CAR":[[45.549752426439454,16.586525493935625],[45.52874855354855,16.549041094155143],[45.41760987322482,16.7734220531205],[45.44898553370305,16.80804808930438],[45.549752426439454,16.586525493935625]],"FOOT":[[45.46029727898767,16.74795436516814],[45.44306334503793,16.706717080203106],[45.38023805112809,16.70320752403586],[45.35404021920357,16.778662981631356],[45.38516805083043,16.84271238168307],[45.42520836178855,16.876930554314384],[45.45537383430943,16.83086762050482],[45.47013067374587,16.74863849821594],[45.46674644269913,16.74556763656929],[45.46029727898767,16.74795436516814]],"CROSS_MOTOR":[[45.508021085297656,16.52311049712563],[45.34828191595605,16.80939246305826],[45.38030687987421,16.87244599832752],[45.532177889045016,16.557178322035526],[45.53696715360519,16.537426612193116],[45.535370777403415,16.52982980071451],[45.508021085297656,16.52311049712563]]}', 'lonjsko_polje');


INSERT INTO public.app_user VALUES (1, 'ROLE_ADMIN', 'admin@wildtrack.com', true, 'admin', NULL, 'admin', false, '$2a$10$tNaYpfjOQoAAZOUKQqTmKOTeZyHqX9/uAbZpg4WgqCYdjdu4jNQzq', 'admin');
INSERT INTO public.app_user VALUES (4, 'ROLE_STATION_MANAGER', 'lonjskoPolje@voditelj.com', true, 'lonjskoPolje', 30685, 'lonjskoPolje', false, '$2a$10$5YCVWJJlx6RNabz4/R4PAeT3Fx88sCqMO5ZQLLcRXNmjIwopMEPF6', 'lonjskoPolje');
INSERT INTO public.app_user VALUES (5, 'ROLE_SEARCHER_IN_THE_FIELD', 'tragac1@tragac1.com', true, 'tragac1', 30686, 'tragac1', false, '$2a$10$QUb.ABgKhZM9EAiZ4Z3mz.au.lZji5ljooQGmXO5pO6QUqCHQ2Yzy', 'tragac1');
INSERT INTO public.app_user VALUES (8, 'ROLE_SEARCHER_IN_THE_FIELD', 'tragac4@tragac4.com', true, 'tragac4', 30689, 'tragac4', false, '$2a$10$pm/WOXVy34QbV1C6cSJRluK1O1qchnzP6pKsG7oAY/WNUlCi7L3g6', 'tragac4');
INSERT INTO public.app_user VALUES (7, 'ROLE_SEARCHER_IN_THE_FIELD', 'tragac3@tragac3.com', true, 'tragac3', 30688, 'tragac3', false, '$2a$10$//e.n.myHg.6G74JPA26vO8yF6v6jFZeOCSd5wbq0ZLTkpLK.7/0K', 'tragac3');
INSERT INTO public.app_user VALUES (6, 'ROLE_SEARCHER_IN_THE_FIELD', 'tragac2@tragac2.com', true, 'tragac2', 30687, 'tragac2', false, '$2a$10$1LmxgoJFMH8EApn9dmI6O.LfULuj6E5xl5d36655NLYVgy54P79Ne', 'tragac2');
INSERT INTO public.app_user VALUES (3, 'ROLE_STATION_MANAGER', 'biokovo@voditelj.com', true, 'biokovo', 30684, 'biokovo', false, '$2a$10$ylgQdWpepROEPgFwAViwhOFYO0wltYDV7ocsK0jx9ryf/6cr/ycdC', 'biokovo');
INSERT INTO public.app_user VALUES (2, 'ROLE_RESEARCHER', 'istrazivac1@istrazivac1.com', true, 'istrazivac1', 30683, 'istrazivac1', false, '$2a$10$53H25D649u7bel/G4HJ6ZOAo5MQ8KFxdnV8fRAUTiKbVgVGNNfI4S', 'istrazivac1');


INSERT INTO public.action VALUES (2, '2. Akcija', 'praćenje', 'lonjsko_polje', '{"subject":"breed","checkedItems":[]}', NULL, 2, NULL);
INSERT INTO public.action VALUES (1, '1. Akcija', 'pretraživanje', 'biokovo', '{"subject":"breed","checkedItems":["vuk"]}', NULL, 2, NULL);


INSERT INTO public.confirmation_token VALUES (1, NULL, '2024-01-18 01:36:43.403366', '2024-01-18 01:51:43.403366', '37b40ad9-b1b1-4f5f-a5ef-99d3f6c865c4', 2);
INSERT INTO public.confirmation_token VALUES (2, NULL, '2024-01-18 01:37:02.331404', '2024-01-18 01:52:02.331404', '83a8c7fe-14ca-4c46-b597-5eb87ed3908d', 3);
INSERT INTO public.confirmation_token VALUES (3, NULL, '2024-01-18 01:38:09.372449', '2024-01-18 01:53:09.372449', '7af5d87f-6e07-4c68-bb09-56a9d0902edf', 4);
INSERT INTO public.confirmation_token VALUES (4, NULL, '2024-01-18 01:38:29.874534', '2024-01-18 01:53:29.874534', 'e22a7fee-ad98-4671-9949-b86d8d790e98', 5);
INSERT INTO public.confirmation_token VALUES (5, NULL, '2024-01-18 01:38:40.040898', '2024-01-18 01:53:40.040898', '62674b5d-a70b-46ed-a8bf-2be11a2661d8', 6);
INSERT INTO public.confirmation_token VALUES (6, NULL, '2024-01-18 01:38:49.567803', '2024-01-18 01:53:49.567803', '87db956d-6ac5-4b89-ba59-7bc050e3550d', 7);
INSERT INTO public.confirmation_token VALUES (7, NULL, '2024-01-18 01:39:01.784639', '2024-01-18 01:54:01.784639', 'd3821cb9-c0a8-4ad7-b789-5fc67bd10d74', 8);


INSERT INTO public.searcher_in_the_field VALUES (3, NULL, NULL, NULL, 7, NULL);
INSERT INTO public.searcher_in_the_field VALUES (4, NULL, NULL, NULL, 8, NULL);
INSERT INTO public.searcher_in_the_field VALUES (1, '{"currentPosition":[43.32,17.05]}', 'FOOT', 1, 5, 1);
INSERT INTO public.searcher_in_the_field VALUES (2, '{"currentPosition":[43.248203680382346,17.278801257671578]}', 'HELICOPTER', 1, 6, 1);


INSERT INTO public.past_locations VALUES (3, '{"currentPosition":[43.32,17.05]}', 1, NULL, 2);


INSERT INTO public.past_routes VALUES (4, '{"routeWaypoints":[[43.32,17.05],[43.248203680382346,17.278801257671578]]}', 1, 2);



INSERT INTO public.animal VALUES (1, 'vuk', '{"currentPosition":[43.326926,17.056618]}', 'bijeli vuk', NULL, 'vuk1', 1);
INSERT INTO public.animal VALUES (2, 'vuk', '{"currentPosition":[43.316935,17.09507]}', 'crni vuk', NULL, 'vuk2', 1);
INSERT INTO public.animal VALUES (3, 'roda', '{"currentPosition":[45.36276,16.812344]}', 'bijela roda', NULL, 'roda1', 2);
INSERT INTO public.animal VALUES (4, 'roda', '{"currentPosition":[45.401343,16.76239]}', 'crna roda', NULL, 'roda2', 2);


INSERT INTO public.station_manager VALUES (1, 3, 1);
INSERT INTO public.station_manager VALUES (2, 4, 2);


INSERT INTO public.task VALUES (2, false, '{"routeWaypoints":[[43.32,17.05],[43.35913519735781,16.991637604891327],[43.45291889355465,16.856962284123462]]}', 'kdfdg', 'tracker', 1, 1);
INSERT INTO public.task VALUES (1, true, '{"routeWaypoints":[[43.32,17.05],[43.248203680382346,17.278801257671578]]}', 'kdfdg', 'camera', 1, 2);

SELECT pg_catalog.setval('public.action_action_id_seq', 2, true);


SELECT pg_catalog.setval('public.animal_animal_id_seq', 4, true);


SELECT pg_catalog.setval('public.confirmation_token_sequence', 7, true);


SELECT pg_catalog.setval('public.hibernate_sequence', 4, true);


SELECT pg_catalog.setval('public.searcher_in_the_field_searcher_in_the_field_id_seq', 4, true);



SELECT pg_catalog.setval('public.station_manager_station_mangaer_id_seq', 2, true);

SELECT pg_catalog.setval('public.station_station_id_seq', 2, true);


SELECT pg_catalog.setval('public.student_sequence', 8, true);


ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_pkey PRIMARY KEY (action_id);



ALTER TABLE ONLY public.animal_comment
    ADD CONSTRAINT animal_comment_pkey PRIMARY KEY (animal_comment_id);



ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (animal_id);



ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.confirmation_token
    ADD CONSTRAINT confirmation_token_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.map_comment
    ADD CONSTRAINT map_comment_pkey PRIMARY KEY (map_comment_id);



ALTER TABLE ONLY public.past_locations
    ADD CONSTRAINT past_locations_pkey PRIMARY KEY (past_location_id);



ALTER TABLE ONLY public.past_routes
    ADD CONSTRAINT past_routes_pkey PRIMARY KEY (past_routes_id);



ALTER TABLE ONLY public.searcher_in_the_field
    ADD CONSTRAINT searcher_in_the_field_pkey PRIMARY KEY (searcher_in_the_field_id);


ALTER TABLE ONLY public.station_manager
    ADD CONSTRAINT station_manager_pkey PRIMARY KEY (station_mangaer_id);



ALTER TABLE ONLY public.station
    ADD CONSTRAINT station_pkey PRIMARY KEY (station_id);



ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);


ALTER TABLE ONLY public.map_comment
    ADD CONSTRAINT fk1bdaok07jnwos9v980mm59l0h FOREIGN KEY (action_action_id) REFERENCES public.action(action_id);


ALTER TABLE ONLY public.station_manager
    ADD CONSTRAINT fk252ksmu6qfrsehawgtjk9x4mi FOREIGN KEY (station_id) REFERENCES public.station(station_id);



ALTER TABLE ONLY public.action
    ADD CONSTRAINT fk2nr86eky5sqlgrc210aje8yw FOREIGN KEY (app_user_id) REFERENCES public.app_user(id);



ALTER TABLE ONLY public.station_manager
    ADD CONSTRAINT fk4cemonqbh8v2lm1hsd6vil77n FOREIGN KEY (user_id) REFERENCES public.app_user(id);



ALTER TABLE ONLY public.animal
    ADD CONSTRAINT fk7r2ta76tlp584r9tqm242v0n0 FOREIGN KEY (station_station_id) REFERENCES public.station(station_id);



ALTER TABLE ONLY public.searcher_in_the_field
    ADD CONSTRAINT fk86c1cpa6mc6twdhq5mv6sce9 FOREIGN KEY (action_id) REFERENCES public.action(action_id);



ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk9xtj33ia8al4gc6t6pwospx22 FOREIGN KEY (action_action_id) REFERENCES public.action(action_id);



ALTER TABLE ONLY public.past_locations
    ADD CONSTRAINT fkcvpjqm751yptmcsjm8qy5xevu FOREIGN KEY (action_action_id) REFERENCES public.action(action_id);



ALTER TABLE ONLY public.animal_comment
    ADD CONSTRAINT fke0wy8aiajd9bww60xxquo7cev FOREIGN KEY (action_action_id) REFERENCES public.action(action_id);


ALTER TABLE ONLY public.action
    ADD CONSTRAINT fkf7tcmm27ift39hskjvo1umvaw FOREIGN KEY (station_station_id) REFERENCES public.station(station_id);



ALTER TABLE ONLY public.past_routes
    ADD CONSTRAINT fkh308kh530kawogk6illbs405b FOREIGN KEY (action_action_id) REFERENCES public.action(action_id);



ALTER TABLE ONLY public.animal_comment
    ADD CONSTRAINT fkje0vuu7pdn5mqm6xmrxos7roa FOREIGN KEY (animal_animal_id) REFERENCES public.animal(animal_id);


ALTER TABLE ONLY public.past_locations
    ADD CONSTRAINT fkjn5eu3nhmon2h2mfsp72m4sg6 FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);


ALTER TABLE ONLY public.searcher_in_the_field
    ADD CONSTRAINT fkkfq8auosf21jh802npg823b3p FOREIGN KEY (station_id) REFERENCES public.station(station_id);


ALTER TABLE ONLY public.confirmation_token
    ADD CONSTRAINT fko9fl25wqyh7w7mnfkdqen1rcm FOREIGN KEY (app_user_id) REFERENCES public.app_user(id);


ALTER TABLE ONLY public.task
    ADD CONSTRAINT fkob2yfknxxdf359gowem6tp690 FOREIGN KEY (searcher_id) REFERENCES public.searcher_in_the_field(searcher_in_the_field_id);



ALTER TABLE ONLY public.searcher_in_the_field
    ADD CONSTRAINT fkod7skyqahryr4nklqnpiaiq2q FOREIGN KEY (user_id) REFERENCES public.app_user(id);



ALTER TABLE ONLY public.past_locations
    ADD CONSTRAINT fkp0c8122shtmuw942cujvhp1gd FOREIGN KEY (searcher_id) REFERENCES public.searcher_in_the_field(searcher_in_the_field_id);



ALTER TABLE ONLY public.past_routes
    ADD CONSTRAINT fkt84gw3lk5tpbc3nw0ryt7b6yq FOREIGN KEY (searcher_id) REFERENCES public.searcher_in_the_field(searcher_in_the_field_id);


