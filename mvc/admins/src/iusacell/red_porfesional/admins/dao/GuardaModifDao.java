package iusacell.red_porfesional.admins.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.controllers.HibernateUtil;

import iusacell.red_porfesional.admins.impl.GuardaModifDaoImpl;


public class GuardaModifDao implements GuardaModifDaoImpl  {
	private int infoUser;
	Session session;
	
	
	public GuardaModifDao(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}

	@Override
	public int datosUsuario(String nombre,String a_p,String a_m,String mail,String password,String tel) throws Exception {
		Transaction tr = session.beginTransaction();
		try{
			
		    String sql="UPDATE \"usuario\" SET  \"usuario\".\"nombre\" = :nombre ,  \"usuario\".\"apellido_paterno\" = :a_p ,  \"usuario\".\"apellido_materno\" = :a_m ,  \"usuario\".\"password\" = :password ,  \"usuario\".\"telefono\" = :tel   WHERE \"usuario\".\"correo_electronico\" = :correo";
	        Query query = session.createSQLQuery(sql);
	        query.setParameter("nombre", nombre);
	        query.setParameter("a_p", a_p);
	        query.setParameter("a_m", a_m);
	        query.setParameter("password", password);
	        query.setParameter("tel", tel);
	        query.setParameter("correo", mail);
	        query.executeUpdate();
	        tr.commit();
	        infoUser=1;
			
		}catch(Exception e){
			  tr.rollback();
			  infoUser=0;
		}
		
		
		return infoUser;
	}

}
