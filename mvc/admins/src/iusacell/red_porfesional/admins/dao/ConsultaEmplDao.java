package iusacell.red_porfesional.admins.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import com.iusa.clases.controllers.HibernateUtil;

import iusacell.red_porfesional.admins.impl.ConsultaEmplDaoImpl;
import iusacell.red_profesional.admins.form.UsuarioForm;


public class ConsultaEmplDao implements ConsultaEmplDaoImpl{
	private ArrayList<UsuarioForm> listadatos = new ArrayList<UsuarioForm>();
	Session session;
	
	
	public ConsultaEmplDao(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	@Override
	public ArrayList<UsuarioForm> infoUsers(String mail) throws Exception {
		// TODO Auto-generated method stub
		Transaction tr = session.beginTransaction();
		try{
			
		    String sql="SELECT * FROM \"usuario\" WHERE \"usuario\".\"correo_electronico\" = :correo";
	        Query query = session.createSQLQuery(sql);
	        query.setParameter("correo", mail);
	        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List res=query.list();
	        for (Object object : res) {
		         Map row = (Map) object;
		         UsuarioForm asigna= new UsuarioForm();
		         asigna.setNombre((String) row.get("nombre"));
		         asigna.setA_p((String) row.get("apellido_paterno"));
		         asigna.setA_m((String) row.get("apellido_materno"));
		         asigna.setCorreo((String) row.get("correo_electronico"));
		         asigna.setPassword((String) row.get("password"));
		         asigna.setTel((String) row.get("telefono"));
		         asigna.setFecha((String) String.valueOf(row.get("fecha_nacimiento")));
		         listadatos.add(asigna);    
	        }
	        tr.commit();
		}catch(Exception e){
			  tr.rollback();
		}
		
		
		return listadatos;
	}

}
