package iusacell.mdc.arh.exception;



public class ObjectNotFoundException extends FinderException
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6546542656L;

	public ObjectNotFoundException(String message, Throwable cause)
	{
		super(message, cause);
	}
	
	public ObjectNotFoundException(String message)
	{
		super(message);
	}
	
	public ObjectNotFoundException(Throwable cause)
	{
		super(cause);
	}
	
}