package mx.itesm.externos.model;

import java.util.StringTokenizer;
import java.util.regex.Pattern;

public class PersonaFisicaMasivo {
	
	private String pov_estatus;
	private String pov_mensaje;
	private String piv_clave_origen;
	private String piv_clave_candidato;
	private String piv_nombre;
	private String piv_apellido_paterno;
	private String piv_apellido_materno;
	private String piv_fecha_nacimiento;
	private String piv_genero;
	private String piv_curp;
	private String piv_rfc;
	private String piv_imss;
	private String piv_clave_pais_nacimiento;
	private String piv_clave_estado_nacimiento;
	private String piv_clave_pais_nacionalidad;
	private String piv_clave_tipo_domicilio;
	private String piv_calle1_domicilio;
	private String piv_calle2_domicilio;
	private String piv_colonia_domicilio;
	private String piv_codigo_postal_domicilio;
	private String piv_clave_pais_domicilio;
	private String doc_vacio;
	
	public final String sistema= "GESTIONCUENTA"; 
	
	public String getPov_estatus() {
		return pov_estatus;
	}
	public void setPov_estatus(String pov_estatus) {
		this.pov_estatus = pov_estatus;
	}
	public String getPov_mensaje() {
		return pov_mensaje;
	}
	public void setPov_mensaje(String pov_mensaje) {
		this.pov_mensaje = pov_mensaje;
	}
	public String getPiv_clave_origen() {
		return piv_clave_origen;
	}
	public void setPiv_clave_origen(String piv_clave_origen) {
		this.piv_clave_origen = piv_clave_origen;
	}
	public String getPiv_clave_candidato() {
		return piv_clave_candidato;
	}
	public void setPiv_clave_candidato(String piv_clave_candidato) {
		this.piv_clave_candidato = piv_clave_candidato;
	}
	public String getPiv_nombre() {
		return piv_nombre;
	}
	public void setPiv_nombre(String piv_nombre) {
		this.piv_nombre = piv_nombre;
	}
	public String getPiv_apellido_paterno() {
		return piv_apellido_paterno;
	}
	public void setPiv_apellido_paterno(String piv_apellido_paterno) {
		this.piv_apellido_paterno = piv_apellido_paterno;
	}
	public String getPiv_apellido_materno() {
		return piv_apellido_materno;
	}
	public void setPiv_apellido_materno(String piv_apellido_materno) {
		this.piv_apellido_materno = piv_apellido_materno;
	}
	public String getPiv_fecha_nacimiento() {
		return piv_fecha_nacimiento;
	}
	public void setPiv_fecha_nacimiento(String piv_fecha_nacimiento) {
		this.piv_fecha_nacimiento = piv_fecha_nacimiento;
	}
	public String getPiv_genero() {
		return piv_genero;
	}
	public void setPiv_genero(String piv_genero) {
		this.piv_genero = piv_genero;
	}
	public String getPiv_curp() {
		return piv_curp;
	}
	public void setPiv_curp(String piv_curp) {
		this.piv_curp = piv_curp;
	}
	public String getPiv_rfc() {
		return piv_rfc;
	}
	public void setPiv_rfc(String piv_rfc) {
		this.piv_rfc = piv_rfc;
	}
	public String getPiv_imss() {
		return piv_imss;
	}
	public void setPiv_imss(String piv_imss) {
		this.piv_imss = piv_imss;
	}
	public String getPiv_clave_pais_nacimiento() {
		return piv_clave_pais_nacimiento;
	}
	public void setPiv_clave_pais_nacimiento(String piv_clave_pais_nacimiento) {
		this.piv_clave_pais_nacimiento = piv_clave_pais_nacimiento;
	}
	public String getPiv_clave_estado_nacimiento() {
		return piv_clave_estado_nacimiento;
	}
	public void setPiv_clave_estado_nacimiento(String piv_clave_estado_nacimiento) {
		this.piv_clave_estado_nacimiento = piv_clave_estado_nacimiento;
	}
	public String getPiv_clave_pais_nacionalidad() {
		return piv_clave_pais_nacionalidad;
	}
	public void setPiv_clave_pais_nacionalidad(String piv_clave_pais_nacionalidad) {
		this.piv_clave_pais_nacionalidad = piv_clave_pais_nacionalidad;
	}
	public String getPiv_clave_tipo_domicilio() {
		return piv_clave_tipo_domicilio;
	}
	public void setPiv_clave_tipo_domicilio(String piv_clave_tipo_domicilio) {
		this.piv_clave_tipo_domicilio = piv_clave_tipo_domicilio;
	}
	public String getPiv_calle1_domicilio() {
		return piv_calle1_domicilio;
	}
	public void setPiv_calle1_domicilio(String piv_calle1_domicilio) {
		this.piv_calle1_domicilio = piv_calle1_domicilio;
	}
	public String getPiv_calle2_domicilio() {
		return piv_calle2_domicilio;
	}
	public void setPiv_calle2_domicilio(String piv_calle2_domicilio) {
		this.piv_calle2_domicilio = piv_calle2_domicilio;
	}
	public String getPiv_colonia_domicilio() {
		return piv_colonia_domicilio;
	}
	public void setPiv_colonia_domicilio(String piv_colonia_domicilio) {
		this.piv_colonia_domicilio = piv_colonia_domicilio;
	}
	public String getPiv_codigo_postal_domicilio() {
		return piv_codigo_postal_domicilio;
	}
	public void setPiv_codigo_postal_domicilio(String piv_codigo_postal_domicilio) {
		this.piv_codigo_postal_domicilio = piv_codigo_postal_domicilio;
	}
	public String getPiv_clave_pais_domicilio() {
		return piv_clave_pais_domicilio;
	}
	public void setPiv_clave_pais_domicilio(String piv_clave_pais_domicilio) {
		this.piv_clave_pais_domicilio = piv_clave_pais_domicilio;
	}
	public String getDoc_vacio() {
		return doc_vacio;
	}
	public void setDoc_vacio(String doc_vacio) {
		this.doc_vacio = doc_vacio;
	}
	public boolean validarCURP(String curp)
	  { String regex = 
	    "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	    "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	    "[HM]{1}" +
	    "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	    "[B-DF-HJ-NP-TV-Z]{3}" +
	    "[0-9A-Z]{1}[0-9]{1}$";
	    
	    Pattern patron = Pattern.compile(regex);
	    
	    if(!patron.matcher(curp).matches())
	    {   
	    	return false;
	    
	    }
	    else
	    {   
	    	return true;
	    }
	    
	  }
	
	public boolean validarRfc(String rfc){
		rfc=rfc.toUpperCase().trim();
		return rfc.toUpperCase().matches("[A-Z]{4}[0-9]{6}[A-Z0-9]{3}");
		}//Cierra método validarRFC
	
	
	public PersonaFisicaMasivo casteaLinea(String linea)
	{
		PersonaFisicaMasivo pf = new PersonaFisicaMasivo();
		StringTokenizer token = new StringTokenizer(linea, "\\|");
		int count = 0;
		while (token.hasMoreTokens()) {
			String elemento = token.nextToken();

			if (count == 0) {
				pf.setPiv_clave_candidato(elemento.trim());
			}
			if (count == 1) {
				pf.setPiv_nombre(elemento.trim());
			}
			if (count == 2) {
				pf.setPiv_apellido_paterno(elemento.trim());
			}
			if (count == 3) {
				pf.setPiv_apellido_materno(elemento.trim());
			}
			if (count == 4) {
				pf.setPiv_fecha_nacimiento(elemento.trim());
			}
			if (count == 5) {
				pf.setPiv_genero(elemento.trim());
			}
			if (count == 6) {
				pf.setPiv_curp(elemento.trim());
			}
			if (count == 7) {
				pf.setPiv_rfc(elemento.trim());
			}
			if (count == 8) {
				pf.setPiv_imss(elemento.trim());
			}
			if (count == 9) {
				pf.setPiv_clave_pais_nacimiento(elemento.trim());
			}
			if (count == 10) {
				pf.setPiv_clave_estado_nacimiento(elemento.trim());
			}
			if (count == 11) {
				pf.setPiv_clave_pais_nacionalidad(elemento.trim());
			}
			if (count == 12) {
				pf.setPiv_clave_tipo_domicilio(elemento.trim());
			}
			if (count == 13) {
				pf.setPiv_calle1_domicilio(elemento.trim());
			}
			if (count == 14) {
				pf.setPiv_calle2_domicilio(elemento.trim());
			}
			if (count == 15) {
				pf.setPiv_colonia_domicilio(elemento.trim());
			}
			if (count == 16) {
				pf.setPiv_codigo_postal_domicilio(elemento.trim());
			}
			if (count == 17) {
				pf.setPiv_clave_pais_domicilio(elemento.trim());
			}
			


			count++;

		}
		
		pf.setDoc_vacio(String.valueOf(count));
		return pf;
	}

}
