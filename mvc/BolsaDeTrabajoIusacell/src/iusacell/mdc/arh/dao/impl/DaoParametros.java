/*
 * Created on 18/11/2008
 *
 */
package iusacell.mdc.arh.dao.impl;

import java.util.ArrayList;
import java.util.List;

import iusacell.mdc.arh.dao.IDaoParametros;
import iusacell.mdc.arh.entities.ParametrosVO;


import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.iusa.clases.controllers.HibernateUtil;

/**
 * 
 * @author jarredondoi
 *
 */
public class DaoParametros implements IDaoParametros{
	
	Session session;
	
	public DaoParametros() {
	}

	private Logger log = Logger.getLogger(DaoParametros.class);
    
    
	public ParametrosVO selectParametroByLlave(String parametro) throws Exception{
    	
        ParametrosVO vo = new ParametrosVO();
        Transaction tr = null;
        try {
        	session=HibernateUtil.getSessionFactory().getCurrentSession();
            tr = session.beginTransaction();
            try {
				Criteria crit = session.createCriteria(ParametrosVO.class);
				crit.add(Restrictions.eq("paramLlave", parametro));
				crit.add(Restrictions.sqlRestriction("ROWNUM = 1"));
				vo = (ParametrosVO) crit.uniqueResult();
				tr.commit();
			} catch (Exception e) {
				tr.rollback();
				e.printStackTrace();
				log.info(e.getMessage());
				vo = null;
				throw new Exception("ERROR_BD: EXISTE PROMOCION BITACORA");
			}
		} catch (Exception e) {
			tr.rollback();
			e.printStackTrace();
			log.info(e.getMessage());
			throw new Exception("ERROR_BD");
		}
        return vo;
    }


	@SuppressWarnings("unchecked")
	@Override
	public List<ParametrosVO> selectListaParametroByLlave(String[] parametros) throws Exception {

    	
		List<ParametrosVO> vo = new ArrayList<ParametrosVO>();
        Transaction tr = null;
        try {
        	session=HibernateUtil.getSessionFactory().getCurrentSession();
            tr = session.beginTransaction();
            try {
				Criteria crit = session.createCriteria(ParametrosVO.class);
				crit.add(Restrictions.in("paramLlave", parametros));
				vo = crit.list();
				tr.commit();
			} catch (Exception e) {
				tr.rollback();
				e.printStackTrace();
				log.info(e.getMessage());
				vo = null;
				throw new Exception("ERROR_BD: EXISTE PROMOCION BITACORA");
			}
		} catch (Exception e) {
			tr.rollback();
			e.printStackTrace();
			log.info(e.getMessage());
			throw new Exception("ERROR_BD");
		}
        return vo;
    
	}
    

}