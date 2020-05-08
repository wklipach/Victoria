import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private gr: GlobalRef) { }

  getPositionUser(id_user, id_branch) {
    const params = new HttpParams()
      .set('get_position_user', 'get_position_user')
      .set('id_user', id_user)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});

  }

  getMessageUnreadCount(id_user, id_branch, date_begin, date_end) {
    const params = new HttpParams()
      .set('get_unread_count', 'get_unread_count')
      .set('id_user', id_user)
      .set('id_branch', id_branch)
      .set('date_begin', date_begin.toISOString())
      .set('date_end', date_end.toISOString());
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getMessageList(id_user, id_branch, id_position, date_begin, date_end) {
    const params = new HttpParams()
      .set('get_message_list', 'get_message_list')
      .set('id_user', id_user)
      .set('id_branch', id_branch)
      .set('id_position', id_position)
      .set('date_begin', date_begin.toISOString())
      .set('date_end', date_end.toISOString());
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getInstructionList(id_user, id_branch, id_position) {
    const params = new HttpParams()
      .set('get_instruction_list', 'get_instruction_list')
      .set('id_user', id_user)
      .set('id_branch', id_branch)
      .set('id_position', id_position);
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getMessageImageList(id_message) {
    const params = new HttpParams()
      .set('message_image_list', 'message_image_list')
      .set('id_message', id_message.toString());
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getCommentLine(id_message) {
    const params = new HttpParams()
      .set('current_message', 'current_message')
      .set('id_message', id_message.toString());
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getGetLastMessage(id_user, id_branch) {
    const params = new HttpParams()
      .set('get_last_message', 'get_last_message')
      .set('id_user', id_user)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  getMessage(id_message) {
    const params = new HttpParams()
      .set('get_message', 'get_message')
      .set('id_message', id_message);
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }



  getCheckpositionBranch(id_branch) {
    const params = new HttpParams()
      .set('get_checkposition_branch', 'get_checkposition_branch')
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'comment', {params: params});
  }

  setNewMessage(id_user_from, id_position_from, id_position_to, id_branch, situation, data_situation, summa, int_instruction) {

    const new_message = { 'insert_new_message': 'insert_new_message',
                          'id_user_from' : id_user_from,
                          'id_position_from': id_position_from,
                          'id_position_to': id_position_to,
                          'id_branch': id_branch,
                          'situation': situation,
                          'data_situation': data_situation,
                          'summa': summa,
                          'int_instruction': int_instruction };
    return this.http.post(this.gr.sUrlGlobal + 'comment', new_message);
  }

   setMessageRead(id_message, id_user) {
     const update_message = { 'read_message': 'read_message',
       'id_message': id_message,
       'id_user': id_user };
     return this.http.post(this.gr.sUrlGlobal + 'comment', update_message);
   }


  setResponseMessage (id_message, id_user, summa, comment_response, int_resp) {
    const update_message = { 'update_message': 'update_message',
                             'id_message': id_message,
                             'id_user': id_user,
                             'summa': summa,
                             'comment_response': comment_response,
                             'int_resp': int_resp
                        };
    return this.http.post(this.gr.sUrlGlobal + 'comment', update_message);
  }

}
