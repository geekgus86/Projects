package com.sidiAlumno.modelo;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ModeloEntity {

    private static final String Default_P_U = "bd_local";
    private EntityManager entityManager;
    private EntityManagerFactory entityMangerFactory;

    public ModeloEntity() {
        entityMangerFactory = Persistence.createEntityManagerFactory(Default_P_U);
        entityManager = entityMangerFactory.createEntityManager();
    }

    public ModeloEntity(String persistenceUnit) {
        entityMangerFactory = Persistence.createEntityManagerFactory(persistenceUnit);
        entityManager = entityMangerFactory.createEntityManager();
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public EntityManagerFactory getEntityMangerFactory() {
        return entityMangerFactory;
    }

    public void close() {
        if (entityManager.isOpen()) {
            entityManager.close();
        }

        if (entityMangerFactory.isOpen()) {
            entityMangerFactory.close();
        }

    }
}
