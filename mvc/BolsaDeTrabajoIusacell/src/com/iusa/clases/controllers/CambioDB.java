package com.iusa.clases.controllers;

import java.text.SimpleDateFormat;
//import java.util.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
//import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import com.iusa.clases.models.DatosPersonales;
//import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class CambioDB extends ActionSupport{
	
	Session session;
	private List<BigDecimal> id_hob;
	private List<String> hobbie;
	private List<String> table_name;
	private List<String> column_name;
	private List<BigDecimal> column_length;
	private List<String> data_type;
	
	

	
	
	public CambioDB(){
		
		session=HibernateUtil.getSessionFactory().getCurrentSession();
		
	} 
	
	public String execute(){
		
		Transaction tr = session.beginTransaction();
      	try{
		
     
        
        id_hob=new ArrayList<BigDecimal>();
        hobbie=new ArrayList<String>();

        
        String sqlHob = "SELECT * FROM all_tables WHERE owner = 'BOLSAIUSACELL'";
        Query queryHob = session.createSQLQuery(sqlHob);
        queryHob.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataHob = queryHob.list();
        for (Object object : dataHob) {
        	Map rowHob = (Map) object;
           
              id_hob.add(new BigDecimal(1));
              hobbie.add((String)rowHob.get("TABLE_NAME"));
                            
        	}
        
    	table_name=new ArrayList<String>();
    	column_name=new ArrayList<String>();
    	column_length=new ArrayList<BigDecimal>();
    	data_type=new ArrayList<String>();
        
    	
    	String sqlTab = "SELECT COLUMN_NAME,DATA_TYPE,DATA_LENGTH,TABLE_NAME FROM user_tab_cols";
        Query queryTab = session.createSQLQuery(sqlTab);
        queryTab.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataTab = queryTab.list();
        for (Object object : dataTab) {
        	Map row = (Map) object;
           
        	table_name.add((String)row.get("TABLE_NAME"));
        	column_name.add((String)row.get("COLUMN_NAME"));
        	column_length.add((BigDecimal)row.get("DATA_LENGTH"));
        	data_type.add((String)row.get("DATA_TYPE"));
                            
        	}
        
        
        
        
        
        tr.commit();
      	}catch(Exception e){
      		e.printStackTrace();
      		tr.rollback();
      	}
		
		
		return "success";
	}

	public List<BigDecimal> getId_hob() {
		return id_hob;
	}

	public void setId_hob(List<BigDecimal> id_hob) {
		this.id_hob = id_hob;
	}

	public List<String> getHobbie() {
		return hobbie;
	}

	public void setHobbie(List<String> hobbie) {
		this.hobbie = hobbie;
	}

	public List<String> getTable_name() {
		return table_name;
	}

	public void setTable_name(List<String> table_name) {
		this.table_name = table_name;
	}

	public List<String> getColumn_name() {
		return column_name;
	}

	public void setColumn_name(List<String> column_name) {
		this.column_name = column_name;
	}

	public List<BigDecimal> getColumn_length() {
		return column_length;
	}

	public void setColumn_length(List<BigDecimal> column_length) {
		this.column_length = column_length;
	}

	public List<String> getData_type() {
		return data_type;
	}

	public void setData_type(List<String> data_type) {
		this.data_type = data_type;
	}

	
	
	
	
	
}