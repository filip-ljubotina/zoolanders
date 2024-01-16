package hr.fer.progi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.repository.SearcherInTheFieldRepository;
import hr.fer.progi.service.impl.AppUserServiceJpa;
import hr.fer.progi.service.impl.PastDataServiceJpa;
import hr.fer.progi.service.impl.SearcherInTheFieldJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PutRemoveFromActionTest {

    private SearcherInTheFieldJpa searcherInTheFieldJpa;

    @Mock
    private SearcherInTheFieldRepository searcherInTheFieldRepository;

    @Mock
    private PastDataServiceJpa pastDataServiceJpa;

    @Mock
    private AppUserServiceJpa appUserServiceJpa;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        searcherInTheFieldJpa = new SearcherInTheFieldJpa(searcherInTheFieldRepository,null, appUserServiceJpa, null, null, null, null, pastDataServiceJpa);
    }
    @Test
    public void testPutRemoveFromAction() {
        Long appUserId = 123L;

        SearcherInTheField searcherMock = mock(SearcherInTheField.class);

        when(searcherInTheFieldJpa.findByAppUserId(appUserId)).thenReturn(searcherMock);

        searcherInTheFieldJpa.putRemoveFromAction(appUserId);

        verify(searcherMock).setAction(null);
        verify(searcherMock).setCurrentPosition(null);

        verify(pastDataServiceJpa).searcherPositionSave(searcherMock);

        verify(searcherInTheFieldRepository).save(searcherMock);
    }

    @Test
    public void testPutRemoveFromAction_AppUserNotFound() {
        Long appUserId = 123L;

        when(searcherInTheFieldJpa.findByAppUserId(appUserId)).thenReturn(null);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> searcherInTheFieldJpa.putRemoveFromAction(appUserId));

        assertEquals("SearcherInTheField is null", exception.getMessage());

        verifyNoMoreInteractions(searcherInTheFieldRepository, pastDataServiceJpa);
    }

    @Test
    public void testPutRemoveFromAction_SaveFailure() {
        Long appUserId = 123L;

        SearcherInTheField searcherMock = mock(SearcherInTheField.class);

        when(searcherInTheFieldJpa.findByAppUserId(appUserId)).thenReturn(searcherMock);
        when(searcherInTheFieldRepository.save(searcherMock)).thenReturn(null);

        searcherInTheFieldJpa.putRemoveFromAction(appUserId);

        verify(pastDataServiceJpa).searcherPositionSave(searcherMock);

        verify(searcherInTheFieldRepository).save(searcherMock);
    }

}
