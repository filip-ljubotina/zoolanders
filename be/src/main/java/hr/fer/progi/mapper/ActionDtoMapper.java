package hr.fer.progi.mapper;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.AppUser;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ActionDtoMapper {

    public Action dtoToClass(ActionDto actionDto, AppUser appUser){
        Action action = new Action();
        action.setActionType(actionDto.getActionType());
        action.setLocationName(actionDto.getLocationName());
        action.setActionName(actionDto.getActionName());
        action.setAppUser(appUser);
        return action;
    }

    public List<ActionDto> actionListToDtoList(List<Action> actions) {
        return actions.stream()
                .map(this::actionToDto)
                .collect(Collectors.toList());
    }

    public ActionDto actionToDto(Action action) {
        ActionDto actionDto = new ActionDto();
        actionDto.setActionId(action.getActionId());
        actionDto.setActionType(action.getActionType());
        actionDto.setLocationName(action.getLocationName());
        actionDto.setActionName(action.getActionName());
        return actionDto;
    }
}
