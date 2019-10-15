package iusacell.red_porfesional.admins.impl;

import iusacell.red_profesional.admins.form.UsuarioForm;

import java.util.ArrayList;

public interface ConsultaEmplDaoImpl {
	
	public ArrayList<UsuarioForm> infoUsers (String mail) throws Exception;

}
