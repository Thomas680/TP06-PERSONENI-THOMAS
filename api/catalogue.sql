CREATE TABLE CATALOGUE (
     ID         SERIAL PRIMARY KEY,
     REF	    VARCHAR(50),
     TITRE	    VARCHAR(255),
     PRIX	    FLOAT
);
INSERT INTO CATALOGUE (REF,TITRE,PRIX) VALUES ( 'X1','Linux',10.5);

INSERT INTO CATALOGUE (REF,TITRE,PRIX) VALUES ( 'X2','Windows',10.5);

INSERT INTO CATALOGUE (REF,TITRE,PRIX) VALUES ( 'X3','Java',10.5);