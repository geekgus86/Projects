package mx.itesm.externos.model;

public class Direccion {

		private String id;
		private int c_postal;
		private String pais;
		private String estado;
		private String ciudad;
		private String municipio;
		private String colonia;
		private String num_int;
		private String num_ext;
		private String calle;
		private String idSucursal;
		private PersonasMorales personaMorales;
		private PersonasFisicas personaFisica;
		
		
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public int getC_postal() {
			return c_postal;
		}
		public void setC_postal(int c_postal) {
			this.c_postal = c_postal;
		}
		public String getPais() {
			return pais;
		}
		public void setPais(String pais) {
			this.pais = pais;
		}
		public String getEstado() {
			return estado;
		}
		public void setEstado(String estado) {
			this.estado = estado;
		}
		public String getCiudad() {
			return ciudad;
		}
		public void setCiudad(String ciudad) {
			this.ciudad = ciudad;
		}
		public String getMunicipio() {
			return municipio;
		}
		public void setMunicipio(String municipio) {
			this.municipio = municipio;
		}
		public String getColonia() {
			return colonia;
		}
		public void setColonia(String colonia) {
			this.colonia = colonia;
		}
		public String getNum_int() {
			return num_int;
		}
		public void setNum_int(String num_int) {
			this.num_int = num_int;
		}
		public String getNum_ext() {
			return num_ext;
		}
		public void setNum_ext(String num_ext) {
			this.num_ext = num_ext;
		}
		public String getCalle() {
			return calle;
		}
		public void setCalle(String calle) {
			this.calle = calle;
		}
		public String getIdSucursal() {
			return idSucursal;
		}
		public void setIdSucursal(String idSucursal) {
			this.idSucursal = idSucursal;
		}
		public PersonasMorales getPersonaMorales() {
			return personaMorales;
		}
		public void setPersonaMorales(PersonasMorales personaMorales) {
			this.personaMorales = personaMorales;
		}
		public PersonasFisicas getPersnonaFisica() {
			return personaFisica;
		}
		public void setPersnonaFisica(PersonasFisicas personaFisica) {
			this.personaFisica = personaFisica;
		}
		
	
		
}
