package com.iusa.clases.interceptor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;

import com.iusa.clases.controllers.HibernateUtil;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class InterceptorLvl extends AbstractInterceptor {
	
	protected BigDecimal idAdministrador;
	protected String ceC;
	protected String eMail;
	protected String correo;
	protected BigDecimal lvl;
	protected String nombreAdmin;
	
	private int lvl_int;
	
	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception
	{
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
        user=(String) sesion.getAttribute("usuario");
        
        Session session=HibernateUtil.getSessionFactory().openSession();
        
       
		
		String sql_admin ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\" FROM \"admins\"  WHERE \"admins\".\"email\" = :user ";
		
		Query A = session.createSQLQuery(sql_admin);
		
		A.setParameter("user", user);
		
		A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dA = A.list();
		
		
		
		for (Object object : dA) {
	         Map row = (Map) object;
	         idAdministrador = (BigDecimal) row.get("id_admin");
	         ceC = (String) row.get("cec");
	         nombreAdmin = (String) row.get("nombre");
	         correo = (String) row.get("email");
	         lvl = (BigDecimal) row.get("nivel");
	         	
	     }
		
		lvl_int = lvl.intValueExact();
        
        final ActionContext context = actionInvocation.getInvocationContext();
        
        
		
        
        if(user == null)
        {
        	 return "login";
        }else if(lvl_int==1 || lvl_int==2){
        	return actionInvocation.invoke();
        }else{
        	return "login";
        	
        }
        
	}
	
	

}
