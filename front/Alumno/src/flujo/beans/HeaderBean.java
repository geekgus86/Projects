package flujo.beans;

public class HeaderBean {

	public String goToMenuPasosPrevios()
	{
		return "menuPasosPrevios?faces-redirect=true";
	}

	public String goToMenuBoletaPago() {
		return "menuBoletaPago?faces-redirect=true";
	}
	
	public String goToConsultaHorario() {
		return "consultaHorario?faces-redirect=true";
	}
}
