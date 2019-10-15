/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author palacios
 */
@Entity
@Table(name = "Users", schema = "admins")
public class User implements Serializable {

    @Id
    private String PERSON_ID;
    @Column
    private String LAST_NAME;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column
    private String DATE_OF_BIRTH;
    @Column(name = "FULL_NAME")
    private String fullName;
    @Column
    private String LOCATION_ID;
    @Column
    private String LOCATION_CODE;
    @Column
    private String UEN_GLOBAL;
    @Column
    private String SUPERVISOR_ID;
    @Column
    private String COORDINADOR;
    @Column
    private String PERSON_TYPE_ID;
    @Column
    private String USER_PERSON_TYPE;
    @Column
    private String EMPLOYEE_CATEGORY;
    @Column
    private String HIRE_DATE;
    @Column
    private String ATTRIBUTE12;
    @Column
    private String POSITION_ID;
    @Column
    private String POSITION;
    @Column
    private String ORGANIZATION_ID;
    @Column
    private String AREA;
    @Column
    private String BUSINESS_GROUP_ID;
    @Column
    private String EMPLOYEE_NUMBER;
    @Column
    private String EMAIL_ADDRESS;
    @Column
    private String PROCESO_ID;
    @Column
    private String PROCESO;
    @Column
    private String TELOFICINA;
    @Column
    private String EXTOFICINA;
    @Column
    private String MOVIL;
    @Column
    private String IDNEXTEL;
    @Column
    private String RFC;
    @Column
    private String CURP;
    @Column
    private String SANGRE;
    @Column
    private String IMSS;
    @Column
    private String DIRECCION;
    @Column
    private String COLONIA;
    @Column
    private String CIUDAD;
    @Column
    private String ESTADO;
    @Column
    private String TELEFONO;
    @Column
    private String LEGAJO;
    @Column
    private String BUSINESS_UNIT;
    @Column
    private String EMP_CAT_MEANING;
    @Column
    private String WORK_EXPERIENCE;
    @Column
    private String COMPANY;
    @Column
    private String MARITAL_STATUS_CODE;
    @Column
    private String MARITAL_STATUS;
    @Column
    private String GENERO_CODE;
    @Column
    private String GENERO;
    @Column
    private String NACIONALIDAD_CODE;
    @Column
    private String NACIONALIDAD;
    @Column
    private String CENTRO_COSTOS;

    public String getPERSON_ID() {
        return PERSON_ID;
    }

    public void setPERSON_ID(String PERSON_ID) {
        this.PERSON_ID = PERSON_ID;
    }

    public String getLAST_NAME() {
        return LAST_NAME;
    }

    public void setLAST_NAME(String LAST_NAME) {
        this.LAST_NAME = LAST_NAME;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLOCATION_ID() {
        return LOCATION_ID;
    }

    public void setLOCATION_ID(String LOCATION_ID) {
        this.LOCATION_ID = LOCATION_ID;
    }

    public String getLOCATION_CODE() {
        return LOCATION_CODE;
    }

    public void setLOCATION_CODE(String LOCATION_CODE) {
        this.LOCATION_CODE = LOCATION_CODE;
    }

    public String getUEN_GLOBAL() {
        return UEN_GLOBAL;
    }

    public void setUEN_GLOBAL(String UEN_GLOBAL) {
        this.UEN_GLOBAL = UEN_GLOBAL;
    }

    public String getDATE_OF_BIRTH() {
        return DATE_OF_BIRTH;
    }

    public void setDATE_OF_BIRTH(String DATE_OF_BIRTH) {
        this.DATE_OF_BIRTH = DATE_OF_BIRTH;
    }

    public String getSUPERVISOR_ID() {
        return SUPERVISOR_ID;
    }

    public void setSUPERVISOR_ID(String SUPERVISOR_ID) {
        this.SUPERVISOR_ID = SUPERVISOR_ID;
    }

    public String getCOORDINADOR() {
        return COORDINADOR;
    }

    public void setCOORDINADOR(String COORDINADOR) {
        this.COORDINADOR = COORDINADOR;
    }

    public String getPERSON_TYPE_ID() {
        return PERSON_TYPE_ID;
    }

    public void setPERSON_TYPE_ID(String PERSON_TYPE_ID) {
        this.PERSON_TYPE_ID = PERSON_TYPE_ID;
    }

    public String getUSER_PERSON_TYPE() {
        return USER_PERSON_TYPE;
    }

    public void setUSER_PERSON_TYPE(String USER_PERSON_TYPE) {
        this.USER_PERSON_TYPE = USER_PERSON_TYPE;
    }

    public String getEMPLOYEE_CATEGORY() {
        return EMPLOYEE_CATEGORY;
    }

    public void setEMPLOYEE_CATEGORY(String EMPLOYEE_CATEGORY) {
        this.EMPLOYEE_CATEGORY = EMPLOYEE_CATEGORY;
    }

    public String getHIRE_DATE() {
        return HIRE_DATE;
    }

    public void setHIRE_DATE(String HIRE_DATE) {
        this.HIRE_DATE = HIRE_DATE;
    }

    public String getATTRIBUTE12() {
        return ATTRIBUTE12;
    }

    public void setATTRIBUTE12(String ATTRIBUTE12) {
        this.ATTRIBUTE12 = ATTRIBUTE12;
    }

    public String getPOSITION_ID() {
        return POSITION_ID;
    }

    public void setPOSITION_ID(String POSITION_ID) {
        this.POSITION_ID = POSITION_ID;
    }

    public String getPOSITION() {
        return POSITION;
    }

    public void setPOSITION(String POSITION) {
        this.POSITION = POSITION;
    }

    public String getORGANIZATION_ID() {
        return ORGANIZATION_ID;
    }

    public void setORGANIZATION_ID(String ORGANIZATION_ID) {
        this.ORGANIZATION_ID = ORGANIZATION_ID;
    }

    public String getAREA() {
        return AREA;
    }

    public void setAREA(String AREA) {
        this.AREA = AREA;
    }

    public String getBUSINESS_GROUP_ID() {
        return BUSINESS_GROUP_ID;
    }

    public void setBUSINESS_GROUP_ID(String BUSINESS_GROUP_ID) {
        this.BUSINESS_GROUP_ID = BUSINESS_GROUP_ID;
    }

    public String getEMPLOYEE_NUMBER() {
        return EMPLOYEE_NUMBER;
    }

    public void setEMPLOYEE_NUMBER(String EMPLOYEE_NUMBER) {
        this.EMPLOYEE_NUMBER = EMPLOYEE_NUMBER;
    }

    public String getEMAIL_ADDRESS() {
        return EMAIL_ADDRESS;
    }

    public void setEMAIL_ADDRESS(String EMAIL_ADDRESS) {
        this.EMAIL_ADDRESS = EMAIL_ADDRESS;
    }

    public String getPROCESO_ID() {
        return PROCESO_ID;
    }

    public void setPROCESO_ID(String PROCESO_ID) {
        this.PROCESO_ID = PROCESO_ID;
    }

    public String getPROCESO() {
        return PROCESO;
    }

    public void setPROCESO(String PROCESO) {
        this.PROCESO = PROCESO;
    }

    public String getTELOFICINA() {
        return TELOFICINA;
    }

    public void setTELOFICINA(String TELOFICINA) {
        this.TELOFICINA = TELOFICINA;
    }

    public String getEXTOFICINA() {
        return EXTOFICINA;
    }

    public void setEXTOFICINA(String EXTOFICINA) {
        this.EXTOFICINA = EXTOFICINA;
    }

    public String getMOVIL() {
        return MOVIL;
    }

    public void setMOVIL(String MOVIL) {
        this.MOVIL = MOVIL;
    }

    public String getIDNEXTEL() {
        return IDNEXTEL;
    }

    public void setIDNEXTEL(String IDNEXTEL) {
        this.IDNEXTEL = IDNEXTEL;
    }

    public String getRFC() {
        return RFC;
    }

    public void setRFC(String RFC) {
        this.RFC = RFC;
    }

    public String getCURP() {
        return CURP;
    }

    public void setCURP(String CURP) {
        this.CURP = CURP;
    }

    public String getSANGRE() {
        return SANGRE;
    }

    public void setSANGRE(String SANGRE) {
        this.SANGRE = SANGRE;
    }

    public String getIMSS() {
        return IMSS;
    }

    public void setIMSS(String IMSS) {
        this.IMSS = IMSS;
    }

    public String getDIRECCION() {
        return DIRECCION;
    }

    public void setDIRECCION(String DIRECCION) {
        this.DIRECCION = DIRECCION;
    }

    public String getCOLONIA() {
        return COLONIA;
    }

    public void setCOLONIA(String COLONIA) {
        this.COLONIA = COLONIA;
    }

    public String getCIUDAD() {
        return CIUDAD;
    }

    public void setCIUDAD(String CIUDAD) {
        this.CIUDAD = CIUDAD;
    }

    public String getESTADO() {
        return ESTADO;
    }

    public void setESTADO(String ESTADO) {
        this.ESTADO = ESTADO;
    }

    public String getTELEFONO() {
        return TELEFONO;
    }

    public void setTELEFONO(String TELEFONO) {
        this.TELEFONO = TELEFONO;
    }

    public String getLEGAJO() {
        return LEGAJO;
    }

    public void setLEGAJO(String LEGAJO) {
        this.LEGAJO = LEGAJO;
    }

    public String getBUSINESS_UNIT() {
        return BUSINESS_UNIT;
    }

    public void setBUSINESS_UNIT(String BUSINESS_UNIT) {
        this.BUSINESS_UNIT = BUSINESS_UNIT;
    }

    public String getEMP_CAT_MEANING() {
        return EMP_CAT_MEANING;
    }

    public void setEMP_CAT_MEANING(String EMP_CAT_MEANING) {
        this.EMP_CAT_MEANING = EMP_CAT_MEANING;
    }

    public String getWORK_EXPERIENCE() {
        return WORK_EXPERIENCE;
    }

    public void setWORK_EXPERIENCE(String WORK_EXPERIENCE) {
        this.WORK_EXPERIENCE = WORK_EXPERIENCE;
    }

    public String getCOMPANY() {
        return COMPANY;
    }

    public void setCOMPANY(String COMPANY) {
        this.COMPANY = COMPANY;
    }

    public String getMARITAL_STATUS_CODE() {
        return MARITAL_STATUS_CODE;
    }

    public void setMARITAL_STATUS_CODE(String MARITAL_STATUS_CODE) {
        this.MARITAL_STATUS_CODE = MARITAL_STATUS_CODE;
    }

    public String getMARITAL_STATUS() {
        return MARITAL_STATUS;
    }

    public void setMARITAL_STATUS(String MARITAL_STATUS) {
        this.MARITAL_STATUS = MARITAL_STATUS;
    }

    public String getGENERO_CODE() {
        return GENERO_CODE;
    }

    public void setGENERO_CODE(String GENERO_CODE) {
        this.GENERO_CODE = GENERO_CODE;
    }

    public String getGENERO() {
        return GENERO;
    }

    public void setGENERO(String GENERO) {
        this.GENERO = GENERO;
    }

    public String getNACIONALIDAD_CODE() {
        return NACIONALIDAD_CODE;
    }

    public void setNACIONALIDAD_CODE(String NACIONALIDAD_CODE) {
        this.NACIONALIDAD_CODE = NACIONALIDAD_CODE;
    }

    public String getNACIONALIDAD() {
        return NACIONALIDAD;
    }

    public void setNACIONALIDAD(String NACIONALIDAD) {
        this.NACIONALIDAD = NACIONALIDAD;
    }

    public String getCENTRO_COSTOS() {
        return CENTRO_COSTOS;
    }

    public void setCENTRO_COSTOS(String CENTRO_COSTOS) {
        this.CENTRO_COSTOS = CENTRO_COSTOS;
    }

}
